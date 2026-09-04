"use client";

import { motion } from "motion/react";
import SectionTitle from "../Common/SectionTitle";
import ServiceCard from "./ServiceCard";
import servicesData from "./servicesData";

const Services = () => {
  return (
    <section className="relative pt-16 pb-8 md:pt-20 lg:pt-28">
      {/* Background ambient glow — only visible in dark mode */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <SectionTitle
            title="What We Build"
            paragraph="Software across the stack — web, mobile, backend, ERP, AI, and the infrastructure to run it all reliably."
            center
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
