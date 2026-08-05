"use client";

import React from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

import { ACHIEVEMENTS, WELFARE_PROJECTS } from "../data";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

export default function HomeSection({ setActiveTab }) {
  const { siteData, language } = useContext(SiteContext);
  // Utility to render Lucide icons dynamically
  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = Icons[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  const activeProjects = WELFARE_PROJECTS.slice(0, 3);

  return (
    <div id="home-section" className="space-y-24 pb-20">
      {/* 1. Hero Section matching user screenshot */}
      <section
        id="hero-banner"
        className="relative bg-stone-950 text-white overflow-hidden py-20 sm:py-32"
      >
        {/* Background Graphic Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/banner.png"
            alt="Jiyonkathi Sustainable Living Community Banner"
            className="w-full h-full object-cover filter brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-emerald-950/30 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-stone-900/80 backdrop-blur-sm border border-stone-800 text-emerald-400 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
            >
              <Icons.Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {language === "bn"
                  ? "আসুন একসাথে একটি টেকসই ভবিষ্যৎ গড়ে তুলি"
                  : "Let's build a sustainable future together"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white font-sans"
            >
              {language === "bn"
                ? "জিয়নকাঠি: একটি টেকসই জীবনযাপনের সমাজ"
                : "Jiyonkathi: A Sustainable Living Community"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-stone-200 leading-relaxed font-normal"
            >
              {language === "bn"
                ? "জিয়নকাঠি বীরভূম, বর্ধমান ও আউশগ্রামের গ্রামাঞ্চলে বিষমুক্ত জৈব কৃষি, দেশীয় ধানের প্রজাতি সংরক্ষণ, শিশুদের সহায়ক শিক্ষা কেন্দ্র ও প্রকৃতি সচেতনতা বিকাশে নিয়োজিত।"
                : "Jiyonkathi is dedicated to pesticide-free organic farming, indigenous rice seed conservation, auxiliary education for rural children, and environmental awareness in Birbhum, Barddhaman, and Aushgram."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="hero-volunteer-cta"
                onClick={() => setActiveTab("volunteer")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/50 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2.5"
              >
                <Icons.Users className="w-5 h-5" />
                <span>{language === "bn" ? "স্বেচ্ছাসেবী হিসেবে যোগ দিন" : "Become a Volunteer"}</span>
              </button>
              <button
                id="hero-donate-cta"
                onClick={() => setActiveTab("donation")}
                className="bg-stone-900/90 hover:bg-stone-800/90 border border-stone-700 text-stone-100 text-base font-semibold px-8 py-4 rounded-2xl active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Icons.Gift className="w-5 h-5 text-emerald-400" />
                <span>{language === "bn" ? "দান করুন ও পাশে থাকুন" : "Donate & Support"}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1.5. Featured NGO Works Video Section */}
      {siteData.homepageVideo && (
        <section
          id="ngo-video-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20"
        >
          <div className="bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            
            {/* Video Player */}
            <div className="lg:col-span-7 bg-black aspect-video relative group flex items-center justify-center">
              <video
                key={siteData.homepageVideo.url}
                src={siteData.homepageVideo.url}
                controls
                autoPlay={Boolean(siteData.homepageVideo.autoplay)}
                muted={Boolean(siteData.homepageVideo.autoplay)}
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6">
              <div className="space-y-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                  {language === "bn" ? "বিশেষ ভিডিও চিত্র" : "Featured NGO Works Video"}
                </span>
                <h3 className="text-2xl font-extrabold text-white leading-tight">
                  {siteData.homepageVideo.title}
                </h3>
                {siteData.homepageVideo.titleEnglish && (
                  <p className="text-xs text-stone-400 font-medium">
                    {siteData.homepageVideo.titleEnglish}
                  </p>
                )}
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {siteData.homepageVideo.description || "জিয়নকাঠির প্রকৃতিবান্ধব কৃষি, বীজ সংরক্ষণ ও সার্বিক গ্রামের অগ্রগতির ভিডিওচিত্র।"}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab("gallery")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center space-x-2"
                >
                  <Icons.Video className="w-4 h-4" />
                  <span>{language === "bn" ? "গ্যালারির সকল ভিডিও দেখুন" : "View All Videos in Gallery"}</span>
                </button>
                <button
                  onClick={() => setActiveTab("blog")}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs px-5 py-3 rounded-xl transition-all"
                >
                  <span>{language === "bn" ? "ভিডিও ব্লগ দেখুন" : "Watch Video Blogs"}</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 2. Impact Stats Grid */}
      <section
        id="impact-stats"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20"
      >
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-100 p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((ach, index) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-5 border-b sm:border-b-0 sm:border-r border-stone-100 pb-6 sm:pb-0 last:border-0"
              >
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
                  {renderIcon(ach.icon, "w-7 h-7")}
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-stone-900 tracking-tight flex items-baseline">
                    <span>{ach.number.toLocaleString()}</span>
                    <span className="text-emerald-500 font-bold ml-0.5">
                      {ach.suffix}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-stone-600 mt-1">
                    {language === "bn" ? ach.labelBengali || ach.label : ach.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep Core Quote Statement */}
      <section
        id="mission-highlight"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <Icons.Quote className="w-12 h-12 text-emerald-200 mx-auto" />
          <h2 className="text-2xl sm:text-3.5xl font-serif font-medium italic text-stone-800 leading-snug">
            {language === "bn"
              ? "“পরিবেশের এই চরম সংকটকালে বিশ্বব্যাপী হুমকির সামনে আমরা স্থানীয় স্তরে একজোট হয়ে প্রকৃতি, মানুষ ও জীবজগৎকে রক্ষা করার যে প্রচেষ্টা চালাচ্ছি... তার নামই জিয়নকাঠি।”"
              : '"In whatever way we perceive the current danger to the environment, and from within our capabilities want to unite at the local level against this impending global danger... that effort is Jiyonkathi."'}
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-px bg-emerald-600" />
            <span className="text-sm font-extrabold uppercase tracking-widest text-emerald-700">
              {language === "bn" ? "জিয়নকাঠির লক্ষ্য ও আদর্শ" : "Jiyonkathi Mission"}
            </span>
            <div className="w-8 h-px bg-emerald-600" />
          </div>
        </div>
      </section>

      {/* 4. Child Welfare Focus Teaser */}
      <section
        id="child-welfare-teaser"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              {language === "bn" ? "আমাদের প্রধান কর্মসূচিসমূহ" : "Our Core Initiatives"}
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {language === "bn" ? "টেকসই গ্রামীণ প্রকল্পসমূহ" : "Sustainable Projects"}
            </h2>
          </div>
          <button
            id="view-all-welfare-btn"
            onClick={() => setActiveTab("work")}
            className="group flex items-center space-x-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>{language === "bn" ? "আমাদের সকল কাজ দেখুন" : "View All Our Work"}</span>
            <Icons.ChevronRight className="w-4 h-4 group-hover:transtone-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeProjects.map((project, idx) => {
            const percentage = Math.min(
              100,
              Math.round((project.raisedAmount / project.targetAmount) * 100),
            );
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900 leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-emerald-600">
                          {percentage}% {language === "bn" ? "সম্পন্ন" : "Raised"}
                        </span>
                        <span className="text-stone-400">
                          {language === "bn" ? "লক্ষ্য:" : "Target:"} ₹{project.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <span>
                        <strong>{project.donorsCount}</strong> {language === "bn" ? "জন সহযোগী" : "Patrons Sponsoring"}
                      </span>
                      <span className="text-emerald-600 font-bold">
                        ₹{project.raisedAmount.toLocaleString()} {language === "bn" ? "সংগৃহীত" : "Raised"}
                      </span>
                    </div>

                    <button
                      id={`project-teaser-donate-${project.id}`}
                      onClick={() => setActiveTab("donation")}
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Icons.HeartHandshake className="w-4 h-4" />
                      <span>{language === "bn" ? "এই প্রকল্পে সাহায্য করুন" : "Back This Campaign"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Help Bento-Grid Section */}
      <section
        id="how-to-help-bento"
        className="bg-stone-50 border-y border-stone-200 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              {language === "bn" ? "আমাদের সাথে যুক্ত হন" : "Join the Cause"}
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              {language === "bn" ? "আপনি যেভাবে আমাদের সহযোগিতা করতে পারেন" : "How You Can Help Make An Impact"}
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              {language === "bn"
                ? "আপনার প্রতিটি সাহায্য ভবিষ্যৎ স্বাবলম্বিতার নতুন পথ তৈরি করে।"
                : "Every contribution builds a brick for future self-reliance."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Icons.Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === "bn" ? "দান করুন" : "Make a Donation"}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {language === "bn"
                    ? "আমাদের জৈব কৃষি, শিশুদের পাঠদান ও চিকিৎসা শিবিরে আর্থিক সহায়তা প্রদান করুন।"
                    : "Support one of our child welfare initiatives or pledge general funding for rapid medical disaster intervention."}
                </p>
              </div>
              <button
                id="help-bento-donate"
                onClick={() => setActiveTab("donation")}
                className="group flex items-center space-x-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{language === "bn" ? "দান করার পাতা" : "Pledge Funds"}</span>
                <Icons.ArrowRight className="w-4 h-4 group-hover:transtone-x-1 transition-transform" />
              </button>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Icons.Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === "bn" ? "স্বেচ্ছাসেবী হিসেবে যোগ দিন" : "Become a Volunteer"}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {language === "bn"
                    ? "আমাদের মাঠে সরাসরি বীজ সংরক্ষণ, শিক্ষা ও চিকিৎসা কর্মসূচিতে আমাদের পাশে থাকুন।"
                    : "Join us on the field to build solar learning rooms, pack scholastic items, or offer pediatric care in our clinic vans."}
                </p>
              </div>
              <button
                id="help-bento-volunteer"
                onClick={() => setActiveTab("volunteer")}
                className="group flex items-center space-x-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{language === "bn" ? "আবেদন করুন" : "Apply as Volunteer"}</span>
                <Icons.ArrowRight className="w-4 h-4 group-hover:transtone-x-1 transition-transform" />
              </button>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Icons.Megaphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === "bn" ? "সচেতনতা বৃদ্ধি করুন" : "Spread Awareness"}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {language === "bn"
                    ? "জিয়নকাঠির কাজের কথা ও গল্প মানুষের মাঝে ছড়িয়ে দিন।"
                    : "Share our stories, publish blog articles to your network, or host local fundraisers in your school or workspace."}
                </p>
              </div>
              <button
                id="help-bento-blog"
                onClick={() => setActiveTab("blog")}
                className="group flex items-center space-x-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{language === "bn" ? "ব্লগ পড়ুন" : "Read Impact Blogs"}</span>
                <Icons.ArrowRight className="w-4 h-4 group-hover:transtone-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
