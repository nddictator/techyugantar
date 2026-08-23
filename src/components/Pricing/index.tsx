import SectionTitle from "../Common/SectionTitle";
import EngagementBox from "./EngagementBox";
import engagementData from "./engagementData";
import { Reveal, Stagger } from "@/components/motion";

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="How We Engage on Projects"
            paragraph="Custom software doesn't fit a public price list — ERP systems, mobile apps, and SaaS platforms all scope differently. Here are the three ways we structure engagements; tell us about your project and we'll recommend the right fit."
            center
            width="665px"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {engagementData.map((model) => (
            <EngagementBox key={model.id} model={model} />
          ))}
        </Stagger>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#399D91" />
              <stop offset="1" stopColor="#399D91" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#399D91" />
              <stop offset="1" stopColor="#399D91" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
