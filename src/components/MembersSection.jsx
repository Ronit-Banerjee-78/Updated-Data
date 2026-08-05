"use client";

import React from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { motion } from "motion/react";
import { Users } from "lucide-react";

export default function MembersSection() {
  const { siteData } = useContext(SiteContext);
  const members = siteData.members || [];

  return (
    <div className="py-24 bg-stone-50 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight sm:text-5xl">Our Members</h2>
          <p className="mt-4 max-w-2xl text-xl text-stone-500 mx-auto">
            Meet the dedicated team driving Jiyonkathi forward every single day.
          </p>
        </div>

        <div className="space-y-20 lg:space-y-32">
          {members.map((member, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Photo Side */}
                <div className="w-full lg:w-5/12 flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative rounded-full overflow-hidden shadow-2xl ring-8 ring-white bg-stone-200 flex-shrink-0 flex items-center justify-center transform transition-transform hover:scale-105 duration-500">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-24 h-24 text-stone-400" />
                    )}
                  </div>
                </div>

                {/* Details Side */}
                <div className={`w-full lg:w-7/12 flex flex-col ${isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"} items-center text-center`}>
                  <h3 className="text-3xl md:text-4xl font-bold text-stone-900">{member.name}</h3>
                  <div className="mt-4 inline-block bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">
                    {member.role}
                  </div>
                  <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
