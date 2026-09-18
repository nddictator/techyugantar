import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import CodeEditor from "@/components/ui/CodeEditor";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <Reveal className="relative mx-auto mb-12 max-w-[520px] lg:m-0">
              <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-teal-500/10 blur-3xl" />
              <div className="relative motion-safe:animate-[float-soft_7s_ease-in-out_infinite]">
                <CodeEditor />
              </div>
            </Reveal>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <Stagger className="max-w-[470px]">
              <StaggerItem className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Scalable Python &amp; Django Backends
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We architect robust server-side applications using Django and DRF,
                  ensuring your data is secure, your APIs are fast, and your
                  business logic is flawlessly executed.
                </p>
              </StaggerItem>
              <StaggerItem className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  High-Performance Frontend
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Using Next.js and React, we build SEO-optimized, lightning-fast
                  web interfaces. We focus on Core Web Vitals to ensure
                  Tech Yugantar products deliver the best user experience.
                </p>
              </StaggerItem>
              <StaggerItem className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Agile Development &amp; Support
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  From Varanasi to the world, we provide end-to-end support and
                  agile iterations. We don&apos;t just write code; we partner with
                  you to evolve your software as your business grows.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
