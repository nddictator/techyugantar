import SectionTitle from "../Common/SectionTitle";
import processData from "./processData";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const Trust = () => {
  return (
    <section id="how-we-work" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="How We Work With You"
            paragraph="No fixed-tier packages pretending to fit every project. Here's the actual process we run for every engagement, from a one-screen MVP to a multi-tenant ERP."
            center
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {processData.map((step) => (
            <StaggerItem key={step.id} className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                {step.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                {step.title}
              </h3>
              <p className="text-body-color text-sm leading-relaxed font-medium">
                {step.paragraph}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/*
          Real client testimonials go here once available — do not fill this with
          placeholder quotes. Reuse the Stagger/StaggerItem card pattern used above,
          one StaggerItem per testimonial (name, role/company, real photo, real quote).
        */}
      </div>
    </section>
  );
};

export default Trust;
