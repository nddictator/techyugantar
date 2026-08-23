import Link from "next/link";
import OfferList from "./OfferList";
import { StaggerItem } from "@/components/motion";
import type { EngagementModel } from "./engagementData";

const EngagementBox = ({ model }: { model: EngagementModel }) => {
  const { name, bestFor, howItWorks, includes } = model;

  return (
    <StaggerItem className="w-full">
      <div className="shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark relative z-10 flex h-full flex-col rounded-xs bg-white px-8 py-10">
        <h3 className="text-dark mb-4 text-2xl font-bold dark:text-white">
          {name}
        </h3>
        <p className="text-body-color mb-2 text-sm font-semibold uppercase tracking-wide">
          Best for
        </p>
        <p className="text-body-color mb-6 text-base">{bestFor}</p>
        <p className="text-body-color mb-2 text-sm font-semibold uppercase tracking-wide">
          How it works
        </p>
        <p className="text-body-color mb-7 text-base">{howItWorks}</p>
        <div className="mb-8 grow">
          {includes.map((item) => (
            <OfferList key={item} text={item} status="active" />
          ))}
        </div>
        <Link
          href="/contact"
          className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-xs p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-primary/90"
        >
          Get a Custom Quote
        </Link>
      </div>
    </StaggerItem>
  );
};

export default EngagementBox;
