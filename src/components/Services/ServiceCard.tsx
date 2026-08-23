import { StaggerItem } from "@/components/motion";
import type { ServiceItem } from "./servicesData";

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const { icon, name, description, whoFor, deliverables } = service;

  return (
    <StaggerItem className="w-full">
      <div className="shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark h-full rounded-xs bg-white px-8 py-10">
        <div className="bg-primary/10 text-primary mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-black dark:text-white">{name}</h3>
        <p className="text-body-color mb-5 text-base leading-relaxed">{description}</p>
        <p className="mb-4 text-sm font-semibold text-primary">{whoFor}</p>
        <ul className="space-y-2">
          {deliverables.map((item) => (
            <li key={item} className="text-body-color flex items-start text-sm">
              <span className="bg-primary/10 text-primary mr-3 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px]">
                &#10003;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </StaggerItem>
  );
};

export default ServiceCard;
