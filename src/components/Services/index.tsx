import SectionTitle from "../Common/SectionTitle";
import ServiceCard from "./ServiceCard";
import servicesData from "./servicesData";
import { Reveal, Stagger } from "@/components/motion";

const Services = () => {
  return (
    <section className="pt-16 pb-8 md:pt-20 lg:pt-28">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="What We Build"
            paragraph="Software across the stack — web, mobile, backend, ERP, AI, and the infrastructure to run it all reliably."
            center
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Services;
