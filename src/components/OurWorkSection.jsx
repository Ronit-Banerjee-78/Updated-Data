"use client";

import React from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { Leaf, Users, ShieldCheck, Sun, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function OurWorkSection() {
  const { siteData } = useContext(SiteContext);

  const getIcon = (idx) => {
    switch (idx % 4) {
      case 0: return <Leaf className="w-6 h-6" />;
      case 1: return <Users className="w-6 h-6" />;
      case 2: return <ShieldCheck className="w-6 h-6" />;
      default: return <Sun className="w-6 h-6" />;
    }
  };

  const works = siteData.work && siteData.work.length > 0 ? siteData.work : [
    {
      id: 1,
      title: "দেশীয় ধান ও বীজ সংরক্ষণ প্রকল্প",
      description: "রাসায়নিক সার ও কীটনাশক মুক্ত উপায়ে দেশীয় ধানের প্রজাতি ও বীজ সংরক্ষণ এবং বিনামূল্যে কৃষকদের বিতরণ।",
      category: "কৃষি ও পরিবেশ",
      highlights: ["১২০+ দেশীয় ধান প্রজাতি সংরক্ষণ", "বিষমুক্ত চাষ পদ্ধতি", "ভূগর্ভস্থ জল অপচয় রোধ"]
    },
    {
      id: 2,
      title: "সহায়ক শিক্ষা কেন্দ্র ও শিশু প্রকৃতি পাঠ",
      description: "গ্রামের শিশুদের জন্য বিনামূল্যে সহায়ক পাঠদান, প্রকৃতি পরিচয়, সর্প সচেতনতা এবং স্থানীয় লোকসংস্কৃতি চর্চা।",
      category: "শিক্ষা ও সংস্কৃতি",
      highlights: ["গ্রামীণ শিশুদের বিনামূল্যে সহায়ক শিক্ষা", "প্রকৃতি পাঠ ও স্বাস্থ্য সচেতনতা"]
    },
    {
      id: 3,
      title: "সর্প সচেতনতা ও গ্রামীণ স্বাস্থ্য শিবির",
      description: "বিশেষজ্ঞ ডাক্তার ও সমাজকর্মীদের পরিচালনায় বিনামূল্যে স্বাস্থ্য পরীক্ষা ও সর্প সচেতনতা প্রশিক্ষণ।",
      category: "গ্রামীণ স্বাস্থ্য",
      highlights: ["সর্প সচেতনতা প্রশিক্ষণ", "বিনামূল্যে চিকিৎসা শিবির"]
    },
    {
      id: 4,
      title: "পুনর্ব্যবহারযোগ্য শক্তি ও পরিবেশ বান্ধব কৃষি",
      description: "জীবাশ্ম জ্বালানির ব্যবহার কমিয়ে সৌর শক্তি ও পুনর্ব্যবহারযোগ্য প্রাকৃতিক সম্পদের সাহায্যে কৃষিকাজ পরিচালনা।",
      category: "টেকসই শক্তি",
      highlights: ["সৌর শক্তি চালিত গ্রামীণ পরিবেশ", "জীবাশ্ম জ্বালানি ব্যবহার হ্রাস"]
    }
  ];

  return (
    <div className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            আমাদের কর্মযজ্ঞ (Our Works)
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl mt-3">
            জিয়নকাঠির প্রকৃতিবান্ধব উদ্যোগসমূহ
          </h2>
          <p className="mt-4 max-w-2xl text-base text-stone-600 mx-auto leading-relaxed">
            তেরো বছর ধরে গ্রামীণ সমাজ, বিষমুক্ত কৃষি, বীজ সংরক্ষণ ও শিশুদের বিকাশের লক্ষ্যে জিয়নকাঠির পথচলা।
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {works.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(index)}
                  </div>
                  {project.category && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-lg">
                      {project.category}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-stone-200/60">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
