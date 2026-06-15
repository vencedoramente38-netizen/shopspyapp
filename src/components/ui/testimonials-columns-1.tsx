"use client";
import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div 
                className="p-8 rounded-[24px] border border-neutral-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-[#D0011B]/20 hover:shadow-[0_12px_45px_rgba(208,1,27,0.03)] hover:scale-[1.01] transition-all duration-300 max-w-xs w-full text-left" 
                key={`${index}-${i}`}
              >
                <div className="text-[14px] font-medium text-neutral-600 leading-relaxed">
                  "{text}"
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-neutral-100 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-[13px] tracking-tight text-neutral-800 leading-4">{name}</div>
                    <div className="text-[11px] text-neutral-400 font-semibold tracking-tight mt-0.5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
