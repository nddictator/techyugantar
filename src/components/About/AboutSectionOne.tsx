import SectionTitle from "../Common/SectionTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import NetworkMesh from "@/components/ui/NetworkMesh";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-body-color-dark">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-teal-500/10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.12] pb-16 dark:border-white/[.1] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <Reveal>
                <SectionTitle
                  title="Enterprise-Grade Software for Scalable Growth."
                  paragraph="At Tech Yugantar, we specialize in building high-concurrency systems and multi-tenant architectures. We transform complex business workflows into streamlined, automated digital platforms."
                  mb="44px"
                />
              </Reveal>

              <Stagger className="mb-12 max-w-[570px] lg:mb-0">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <StaggerItem><List text="Multi-tenant Architecture" /></StaggerItem>
                    <StaggerItem><List text="ERP-Level Complexity" /></StaggerItem>
                    <StaggerItem><List text="Secure Data Isolation" /></StaggerItem>
                  </div>
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <StaggerItem><List text="Custom SaaS Platforms" /></StaggerItem>
                    <StaggerItem><List text="Scalable API Design" /></StaggerItem>
                    <StaggerItem><List text="Cloud-Native Solutions" /></StaggerItem>
                  </div>
                </div>
              </Stagger>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <Reveal delay={0.1}>
                <div className="relative mx-auto max-w-[520px] lg:mr-0">
                  {/* glow */}
                  <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-teal-500/10 blur-3xl" />
                  <div className="relative overflow-hidden rounded-3xl border p-8
                    border-black/[0.07] bg-white/70 shadow-[0_20px_60px_rgba(6,8,15,0.08)] backdrop-blur-xl
                    dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium
                      border-black/[0.06] bg-cream-100 text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Distributed by design
                    </span>
                    <NetworkMesh className="mt-2" />
                    <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                      {[
                        { k: "99.9%", v: "Uptime" },
                        { k: "<100ms", v: "API p95" },
                        { k: "Multi", v: "Tenant" },
                      ].map((s) => (
                        <div key={s.v} className="rounded-xl border border-black/[0.05] bg-cream-100/60 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                          <p className="font-display text-lg font-semibold text-gray-900 dark:text-white">{s.k}</p>
                          <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-zinc-500">{s.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
