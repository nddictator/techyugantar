import SectionTitle from "../Common/SectionTitle";
import techStackData from "./techStackData";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Our Tech Stack"
            paragraph="The technologies we actually build with, day to day — organized by where they sit in a project."
            center
          />
        </Reveal>

        <div className="space-y-12">
          {techStackData.map((group) => (
            <div key={group.category}>
              <Reveal>
                <h3 className="mb-6 text-center text-lg font-bold text-black dark:text-white">
                  {group.category}
                </h3>
              </Reveal>
              <Stagger className="flex flex-wrap items-center justify-center gap-6">
                {group.items.map((item) => (
                  <StaggerItem
                    key={item.name}
                    className="shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two flex min-w-[140px] flex-col items-center gap-3 rounded-xs bg-white px-6 py-5"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-body-color text-sm font-medium">{item.name}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
