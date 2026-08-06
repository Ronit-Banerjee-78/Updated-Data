"use client";

import React, { useState, useEffect, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { motion, AnimatePresence } from "motion/react";
import { Users, HandHelping, MapPin, Award, ChevronLeft, ChevronRight, Sparkles, UserCheck } from "lucide-react";

export default function MembersSection() {
  const { siteData, language } = useContext(SiteContext);
  const members = siteData.members || [];
  const baseVolunteers = siteData.volunteersList || [
    { id: "v-1", name: "Sutapa Sarkar", designation: "Auxiliary Education Volunteer Teacher", location: "Burdwan, WB", image: "/images/education-center.jpg", bio: "Teaching village youth about nature and local heritage." },
    { id: "v-2", name: "Anirban Mukherjee", designation: "Organic Farming & Soil Testing Volunteer", location: "Kolkata, WB", image: "/images/seedbed.jpg", bio: "Weekend volunteer leading indigenous seed conservation drives." },
    { id: "v-3", name: "Swapna Ghosh", designation: "Nature Awareness & Community Organizer", location: "Aushgram, WB", image: "/images/community-collage.jpg", bio: "Organizing village women for sustainable handicrafts and seed collection." },
    { id: "v-4", name: "Debabrata Sen", designation: "Eco-farming & Bio-fertilizer Field Lead", location: "Bolpur, WB", image: "/images/paddy-harvesting.jpg", bio: "Training smallholders in zero-chemical natural farming." }
  ];

  const [dbVolunteers, setDbVolunteers] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    let active = true;
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(json => {
        if (active && json.success && Array.isArray(json.volunteers)) {
          const approved = json.volunteers.filter(v => v.status === 'approved');
          setDbVolunteers(approved);
        }
      })
      .catch(err => console.error("Error fetching approved volunteers:", err));
    return () => { active = false; };
  }, []);

  // Merge baseVolunteers from SiteContext with dbVolunteers from database
  const allVolunteersMap = new Map();
  baseVolunteers.forEach(v => allVolunteersMap.set(String(v.id), v));
  dbVolunteers.forEach(v => {
    allVolunteersMap.set(String(v.id), {
      id: v.id,
      name: v.name,
      designation: v.program || "Community Volunteer",
      location: v.location || "Purba Bardhaman, WB",
      image: v.image || null,
      bio: v.motivation || v.skills || "Active community volunteer."
    });
  });
  const volunteersList = Array.from(allVolunteersMap.values());

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % volunteersList.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + volunteersList.length) % volunteersList.length);
  };

  return (
    <div className="py-20 bg-stone-50 w-full overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Top Members Header */}
        <div className="text-center">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
            {language === "bn" ? "আমাদের পরিজন" : "Leadership & Community Members"}
          </span>
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight sm:text-5xl mt-3">
            {language === "bn" ? "আমাদের নির্বাহী সদস্যবৃন্দ" : "Executive Members"}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-600 mx-auto leading-relaxed">
            {language === "bn"
              ? "জিয়নকাঠির দৈনন্দিন সুপরিচালনা ও সমাজভিত্তিক উন্নয়নের মূল চালিকাশক্তি।"
              : "Meet the dedicated core leadership driving Jiyonkathi forward every single day."}
          </p>
        </div>

        {/* Core Executive Members Section */}
        <div className="space-y-16 lg:space-y-20">
          {members.map((member, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-lg ${isEven ? "" : "lg:flex-row-reverse"
                  }`}
              >
                {/* Photo Side */}
                <div className="w-full lg:w-5/12 flex justify-center">
                  <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 relative rounded-full overflow-hidden shadow-2xl ring-8 ring-stone-100 bg-stone-200 flex-shrink-0 flex items-center justify-center transform transition-transform hover:scale-105 duration-500">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-24 h-24 text-stone-400" />
                    )}
                  </div>
                </div>

                {/* Details Side */}
                <div className={`w-full lg:w-7/12 flex flex-col ${isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"} items-center text-center space-y-4`}>
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-200">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{member.role}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
                    {member.name}
                  </h3>

                  <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Normal Members & Community Volunteers Carousel Section */}
        <div id="members-carousel-container" className="border-t border-stone-200 pt-16 space-y-10">

          {/* Section Heading with Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-emerald-50/80 text-stone-900 p-8 sm:p-10 rounded-3xl shadow-sm border border-emerald-200/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-2 relative z-10">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{language === "bn" ? "সাধারণ সদস্য ও স্বেচ্ছাসেবক ক্যারোসেল" : "Members & Volunteers Showcase"}</span>
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                {language === "bn" ? "আমাদের সাধারণ সদস্যবৃন্দ (Members Carousel)" : "Community Members & Volunteers Carousel"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                {language === "bn"
                  ? "গ্রামোন্নয়ন, শিক্ষা কেন্দ্র পরিচালনা ও বীজ সংরক্ষণে যুক্ত সাধারণ সদস্য এবং স্বেচ্ছাসেবকদের প্রোফাইল।"
                  : "Explore our active village members, auxiliary teachers, and volunteer conservationists sustaining grassroots welfare."}
              </p>
            </div>

            {/* Carousel Control Buttons */}
            <div className="flex items-center space-x-3 relative z-10 shrink-0">
              <button
                onClick={handlePrev}
                id="members-carousel-prev"
                className="bg-white hover:bg-emerald-600 text-stone-700 hover:text-white p-3.5 rounded-2xl transition-all border border-stone-200 shadow-sm active:scale-95"
                title="Previous Member"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                id="members-carousel-next"
                className="bg-white hover:bg-emerald-600 text-stone-700 hover:text-white p-3.5 rounded-2xl transition-all border border-stone-200 shadow-sm active:scale-95"
                title="Next Member"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Member Carousel Display Card */}
          {volunteersList.length > 0 && (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Photo Column */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-4 border-stone-100 shadow-xl bg-stone-100 shrink-0 flex items-center justify-center">
                      {volunteersList[carouselIndex].image ? (
                        <img
                          src={volunteersList[carouselIndex].image}
                          alt={volunteersList[carouselIndex].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-20 h-20 text-stone-400" />
                      )}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{volunteersList[carouselIndex].designation || "Community Member"}</span>
                      </span>
                      <span className="bg-stone-100 text-stone-600 text-xs font-bold px-3 py-1 rounded-full border border-stone-200 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span>{volunteersList[carouselIndex].location || "Purba Bardhaman, WB"}</span>
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                      {volunteersList[carouselIndex].name}
                    </h4>

                    <p className="text-stone-600 text-base leading-relaxed italic bg-stone-50 p-4 rounded-2xl border border-stone-100">
                      &quot;{volunteersList[carouselIndex].bio || "Active community member dedicated to environmental conservation and village children education."}&quot;
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700">
                        <HandHelping className="w-4 h-4" />
                        <span>Member #{carouselIndex + 1} of {volunteersList.length}</span>
                      </div>
                      <div className="text-xs text-stone-400 font-medium">
                        Slide {carouselIndex + 1} / {volunteersList.length}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {volunteersList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === carouselIndex ? "w-8 bg-emerald-600" : "w-2.5 bg-stone-300 hover:bg-stone-400"
                      }`}
                    title={`Go to member ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grid View Backup for All Members */}
          <div className="pt-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6 text-center">
              {language === "bn" ? "সকল সাধারণ সদস্যদের তালিকা" : "Complete List of Community Members"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {volunteersList.map((vol, idx) => (
                <div
                  key={vol.id || idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 ${idx === carouselIndex
                      ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400 shadow-sm"
                      : "bg-white border-stone-200 hover:border-emerald-200 hover:bg-stone-50"
                    }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 flex items-center justify-center border border-stone-200">
                    {vol.image ? (
                      <img src={vol.image} alt={vol.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-stone-400" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-sm font-bold text-stone-900 truncate">{vol.name}</h5>
                    <p className="text-xs text-emerald-700 font-semibold truncate">{vol.designation || "Community Member"}</p>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">{vol.location || "Purba Bardhaman, WB"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
