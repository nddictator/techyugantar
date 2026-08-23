import Link from "next/link";
import { Reveal } from "@/components/motion";

const EngagementRecap = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <Reveal className="shadow-three dark:bg-gray-dark mx-auto max-w-[800px] rounded-xs bg-white px-8 py-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
            Not sure how to structure your project?
          </h3>
          <p className="text-body-color mb-8 text-base leading-relaxed">
            We work under three engagement models — Fixed Price, Time & Material, or a
            Dedicated Team — depending on how well-defined your scope is.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-xs border border-primary px-8 py-3 text-base font-semibold text-primary duration-300 hover:bg-primary hover:text-white"
            >
              See Engagement Models
            </Link>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 rounded-xs px-8 py-3 text-base font-semibold text-white duration-300"
            >
              Get a Custom Quote
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EngagementRecap;
