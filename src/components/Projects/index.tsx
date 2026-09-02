import SectionTitle from "../Common/SectionTitle";
import SingleProject from "./SingleProject";
import { projectsData } from "./projectsData";
import { Reveal, Stagger } from "@/components/motion";

const Projects = () => {
  return (
    <section id="projects" className="bg-primary/5 py-16 md:py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Our Featured Projects"
            paragraph="Explore some of our recent work showcasing modern UI, seamless animations, and scalable architecture. We turn big ideas into shipped software."
            center
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2">
          {projectsData.map((project) => (
            <SingleProject key={project.id} project={project} />
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Projects;
