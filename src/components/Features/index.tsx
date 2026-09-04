import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { Reveal, Stagger } from "@/components/motion";

const Features = () => {
  return (
    <section id="features" className="relative py-16 md:py-20 lg:py-28">
      {/* Subtle section background tint */}
      <div className="pointer-events-none absolute inset-0 bg-gray-50/50 dark:bg-zinc-950/30" />

      <div className="container relative">
        <Reveal>
          <SectionTitle
            title="Our Tech Stack & Expertise"
            paragraph="We pick the right tool for the job — from blazing-fast Next.js frontends to Django backends, Flutter apps, Node.js real-time services, and AI pipelines."
            center
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Features;
