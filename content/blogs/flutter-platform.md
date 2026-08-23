---
title: "Flutter Platform Channels: Bridging Dart and Native iOS/Android Code"
excerpt: "Sometimes the plugin you need does not exist. We walk through building a custom MethodChannel for BLE communication, handling threading on both sides, and writing tests that mock native calls."
author: "Tech Yugantar — Mobile Team"
date: "2025-06-09"
tags: ["flutter"]
image: "/images/blog/blog-flutter-platform.jpg"
---

Most Flutter apps never need a platform channel — the plugin ecosystem covers the common cases. Custom BLE protocols, proprietary hardware SDKs, and anything requiring fine-grained control over native threading are where you end up writing one yourself.

## MethodChannel is a request/response RPC, nothing more

A `MethodChannel` sends a method name and arguments from Dart to native code and awaits a single response — that's the entire contract. It's not a stream, and treating it like one (calling `invokeMethod` repeatedly to "poll" for BLE data) works but wastes both the channel and battery. For genuinely streaming data — BLE characteristic notifications, in our case — `EventChannel` is the right primitive: native code pushes events, Dart listens on a `Stream`.

```dart
static const _events = EventChannel('com.techyugantar/ble_notifications');

Stream<BleReading> get readings => _events
    .receiveBroadcastStream()
    .map((raw) => BleReading.fromMap(raw));
```

## Threading is the part that actually bites

Android's `MethodChannel` handlers run on the platform (UI) thread by default — calling a blocking BLE operation directly inside `onMethodCall` freezes the app's UI until it returns. We moved all native BLE work onto a dedicated `HandlerThread`, dispatching the result back to the main thread only to invoke the `MethodChannel.Result` callback. iOS has the mirror problem with `DispatchQueue` — Core Bluetooth callbacks arrive on whatever queue you configured the central manager with, and forgetting to hop back to the main queue before touching UI-adjacent state produces intermittent, hard-to-reproduce crashes.

## Serialization at the boundary

Platform channels serialize arguments through a standard codec that supports primitives, lists, and maps — not custom Dart classes directly. Every BLE reading crosses the boundary as a `Map<String, dynamic>` with explicit key names on both sides, converted to a typed Dart class immediately on receipt. We keep this conversion in exactly one place per data type, because a key name typo on one side of the boundary fails silently (a `null` value, not an exception) and is miserable to debug otherwise.

## Testing without real hardware

Native BLE hardware isn't available in CI, so the channel itself gets mocked at the Dart level using `TestDefaultBinaryMessengerBinding.setMockMethodCallHandler`, letting us assert on the exact arguments Dart sends and inject canned responses without touching real Bluetooth. This tests the Dart-side contract thoroughly; the native implementation itself gets a much smaller suite of on-device manual test cases, since that's genuinely hardware-dependent and doesn't mock well.

Platform channels are approachable once you internalize that it's just typed RPC across a process-ish boundary — the actual difficulty is almost always threading, not the channel API itself.
