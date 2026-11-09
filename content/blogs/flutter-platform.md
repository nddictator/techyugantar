---
title: "Flutter Platform Channels: Bridging Dart and Native iOS/Android Code"
excerpt: "Sometimes the plugin you need does not exist. We walk through building a custom MethodChannel for BLE communication, handling threading on both sides, and writing tests that mock native calls."
author: "Tech Yugantar — Mobile Team"
date: "2025-06-09"
tags: ["flutter"]
image: "/images/blog/blog-flutter-platform.jpg"
---

Most Flutter apps never need a platform channel — the plugin ecosystem covers the common cases. Custom BLE protocols, proprietary hardware SDKs, and anything that needs fine-grained control over native threading are where you end up writing one yourself.

We recently built one for a device that speaks a custom protocol over Bluetooth Low Energy: connect, authenticate, stream sensor readings, and push configuration back. This is what we learned about doing it cleanly.

## Pick the right bridge first

Flutter gives you three ways to reach native code, and choosing well saves a lot of pain later.

- **MethodChannel / EventChannel** — asynchronous messages between Dart and Kotlin/Swift. The right default for talking to platform SDKs (Bluetooth, camera, payments, OEM libraries).
- **Pigeon** — a code generator from the Flutter team that produces type-safe channel code for both sides from a single Dart definition. Same mechanism underneath, without hand-written string keys.
- **dart:ffi** — direct, synchronous calls into C libraries. Ideal for a native C/C++ library (a codec, a crypto library), and the wrong tool for platform SDKs that live in Kotlin or Swift.

Our BLE work needed Android's and iOS's Bluetooth stacks, so channels were the answer. For anything with more than a handful of methods, we now generate them with Pigeon — but the concepts below apply either way.

## MethodChannel is request/response, nothing more

A `MethodChannel` sends a method name and arguments from Dart to native code and awaits a single response. That's the entire contract. It isn't a stream, and treating it like one — calling `invokeMethod` in a loop to "poll" for new BLE data — works, but wastes the channel and the battery.

For genuinely streaming data — BLE characteristic notifications, in our case — `EventChannel` is the right primitive. Native code pushes events; Dart listens on a `Stream`.

```dart
class BleBridge {
  static const _methods = MethodChannel('com.techyugantar/ble');
  static const _events = EventChannel('com.techyugantar/ble_notifications');

  Future<void> connect(String deviceId) =>
      _methods.invokeMethod('connect', {'deviceId': deviceId});

  Stream<BleReading> get readings => _events
      .receiveBroadcastStream()
      .map((raw) => BleReading.fromMap(Map<String, dynamic>.from(raw as Map)));
}
```

## EventChannel has a lifecycle — use it

On the native side, an `EventChannel` stream handler gets `onListen` when Dart starts listening and `onCancel` when the last listener goes away. That's exactly where to start and stop the expensive work.

We subscribe to BLE notifications in `onListen` and unsubscribe in `onCancel`. When the user leaves the live-readings screen, the Dart stream subscription is cancelled, `onCancel` fires, and the radio stops doing work nobody is looking at. Forgetting this is the most common cause of "the app drains battery even when I'm not using it" bug reports.

## Threading is the part that actually bites

Android's `MethodChannel` handlers run on the platform (main) thread by default. Calling a blocking BLE operation directly inside `onMethodCall` freezes the app's UI until it returns — and Android will happily show an "app not responding" dialog if it takes long enough.

We moved all native BLE work onto a dedicated background thread and posted back to the main thread only to deliver the result:

```kotlin
class BleChannelHandler(private val ble: BleClient) : MethodChannel.MethodCallHandler {
    private val worker = HandlerThread("ble-worker").apply { start() }
    private val workerHandler = Handler(worker.looper)
    private val mainHandler = Handler(Looper.getMainLooper())

    override fun onMethodCall(call: MethodCall, result: MethodChannel.Result) {
        when (call.method) {
            "connect" -> {
                val deviceId = call.argument<String>("deviceId")
                    ?: return result.error("BAD_ARGS", "deviceId is required", null)
                workerHandler.post {
                    try {
                        ble.connect(deviceId)
                        mainHandler.post { result.success(null) }
                    } catch (e: BleException) {
                        mainHandler.post { result.error("CONNECT_FAILED", e.message, null) }
                    }
                }
            }
            else -> result.notImplemented()
        }
    }
}
```

Two rules that keep this safe: reply exactly once per call (replying twice crashes; never replying leaves the Dart `Future` hanging forever), and always reply on the main thread. Newer Flutter versions also let you register a channel on a background task queue with `binaryMessenger.makeBackgroundTaskQueue()`, which runs the handler off the main thread for you.

iOS has the mirror problem. Core Bluetooth delivers delegate callbacks on whatever `DispatchQueue` you created the `CBCentralManager` with. We give it a dedicated serial queue and hop to the main queue before replying to Flutter or emitting events:

```swift
private let bleQueue = DispatchQueue(label: "com.techyugantar.ble")
private lazy var central = CBCentralManager(delegate: self, queue: bleQueue)

func peripheral(_ peripheral: CBPeripheral,
                didUpdateValueFor characteristic: CBCharacteristic,
                error: Error?) {
    guard let data = characteristic.value else { return }
    let reading = Reading.decode(data).asDictionary()
    DispatchQueue.main.async { self.eventSink?(reading) }
}
```

Mixing queues up produces intermittent, hard-to-reproduce crashes — exactly the kind that only appear on a customer's device.

## Serialization at the boundary

Platform channels serialize arguments through the `StandardMessageCodec`, which supports primitives, byte arrays, lists and maps — not your Dart classes. Every BLE reading crosses the boundary as a map with explicit keys on both sides and is converted to a typed Dart object immediately on receipt.

We keep that conversion in exactly one place per type. A key-name typo on one side fails silently — you get `null`, not an exception — and is miserable to debug. This is the strongest argument for Pigeon: the keys disappear, and both sides are generated from one definition, so they can't drift apart.

For raw sensor payloads, we send the bytes as a `Uint8List` and decode them in Dart. That's cheaper than building a map per reading at high frequency, and keeps the protocol logic in one language where it can be unit-tested.

## Errors are part of the contract

Native failures reach Dart as a `PlatformException` with a `code`, a `message` and optional `details`. We treat the codes as an API:

- `BAD_ARGS` — a bug on the Dart side; log it loudly.
- `PERMISSION_DENIED` — show the permissions screen.
- `BLUETOOTH_OFF` — prompt the user to turn Bluetooth on.
- `CONNECT_FAILED`, `TIMEOUT` — retryable; the UI offers "Try again".

A `MissingPluginException` means the channel name doesn't match or the handler wasn't registered — almost always a typo, or a hot-restart issue after adding native code. A full rebuild fixes the latter.

## Permissions are part of the feature

BLE permissions changed significantly across Android versions. Android 12 and above need the runtime permissions `BLUETOOTH_SCAN` and `BLUETOOTH_CONNECT`; older versions needed location permission to scan at all. iOS needs an `NSBluetoothAlwaysUsageDescription` string in `Info.plist`, and the app is terminated on first Bluetooth access without it.

We check and request permissions in Dart before calling the channel, and the native side still verifies them and returns `PERMISSION_DENIED` rather than crashing if something slipped through.

## Package it like a plugin

Even for a single app, we put the channel code in a local Flutter plugin package inside the repo rather than scattering Kotlin and Swift across the app's `android/` and `ios/` folders. The Dart API, native implementations and tests live together, the app depends on the package like any other, and reusing it in a second app is trivial.

## Testing without real hardware

BLE hardware isn't available in CI, so the channel is mocked at the Dart level. Flutter's test binding lets you intercept calls on a channel, assert on the exact arguments, and return canned responses:

```dart
setUp(() {
  TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
      .setMockMethodCallHandler(const MethodChannel('com.techyugantar/ble'), (call) async {
    if (call.method == 'connect') {
      expect(call.arguments, {'deviceId': 'AA:BB:CC'});
      return null;
    }
    throw PlatformException(code: 'UNEXPECTED', message: call.method);
  });
});
```

That covers the Dart-side contract and all the UI states driven by error codes. The native implementation gets a smaller suite of on-device test cases against real hardware — connect, disconnect mid-stream, Bluetooth toggled off, app backgrounded — because that's genuinely hardware-dependent and doesn't mock well.

Platform channels are approachable once you internalise that they're just typed RPC across a boundary. The difficulty is almost never the channel API itself — it's threading, lifecycle, and keeping both sides of the contract in sync.
