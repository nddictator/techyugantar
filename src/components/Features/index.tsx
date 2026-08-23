import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { Reveal, Stagger } from "@/components/motion";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionTitle
              title="Our Tech Stack & Expertise"
              paragraph="At Tech Yugantar, we leverage the most powerful and modern technologies to build scalable, secure, and future-ready software solutions."
              center
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </Stagger>

          <Reveal className="mt-12 text-center" delay={0.1}>
            <Link
              href="/services"
              className="text-primary inline-flex items-center gap-2 text-base font-semibold hover:underline"
            >
              See all services
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Features;
