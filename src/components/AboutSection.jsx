"use client";

import React, { useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { Leaf, Users, Zap, BookOpen, Heart, ShieldCheck } from "lucide-react";
import { BENGALI_CONTENT } from "../data";

export default function AboutSection() {
  const { siteData, language } = useContext(SiteContext);

  const cardItems = [
    {
      id: "p-1",
      letter: "ক",
      titleBn: "দেশীয় প্রজাতির দানাশস্য ও বীজ সংরক্ষণ",
      titleEn: "Indigenous Seed & Crop Conservation",
      descBn: "দেশীয় প্রজাতির দানাশস্য (মূলত ধান) ও সবজি চাষ করা এবং তাদের বীজ সংরক্ষণ করা। রাসায়নিক সার ও কীটনাশক একেবারেই না ব্যবহার করা, ভূগর্ভস্থ জল না তোলা এবং ন্যূনতম জীবাশ্ম জ্বালানি ব্যবহার করা।",
      descEn: "Cultivating indigenous varieties of paddy and vegetables and conserving their seeds without chemical fertilizers, pesticides, or drawing groundwater.",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      id: "p-2",
      letter: "খ",
      titleBn: "কৃষিজীবী মানুষের সাথে নিবিড় যোগাযোগ",
      titleEn: "Farmer & Community Engagement",
      descBn: "গ্রামের কৃষিজীবী মানুষদের সাথে নিবিড় যোগাযোগ বাড়ানো ও অভিজ্ঞতার আদান-প্রদান করা, যাতে তারা পরিবেশের ভারসাম্য বজায় রেখে প্রকৃতিবান্ধব উপায়ে ফসল উৎপাদনে উৎসাহী হন।",
      descEn: "Building deep connections with rural farmers to exchange knowledge, encouraging eco-friendly cultivation and sustainable farming practices.",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: "p-3",
      letter: "গ",
      titleBn: "পুনর্ব্যবহারযোগ্য শক্তির ব্যবহার",
      titleEn: "Renewable Energy Adoption",
      descBn: "পুনর্ব্যবহারযোগ্য শক্তিকে (সৌর শক্তি) নিজেদের কাজ ও কৃষিতে ব্যবহার করা এবং পরিবেশবান্ধব সবুজ শক্তির ভারসাম্য রক্ষা করা।",
      descEn: "Utilizing renewable solar energy in daily activities and agricultural work to minimize reliance on fossil fuels.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: "p-4",
      letter: "ঘ",
      titleBn: "সহায়ক শিক্ষা কেন্দ্র ও পরিবেশ সচেতনতা",
      titleEn: "Auxiliary Education & Nature Study",
      descBn: "শিশুদের জন্য সহায়ক শিক্ষা কেন্দ্র চালনা করা, যাতে পাঠদানের সাথে সাথে তারা প্রকৃতির অংশ হিসেবে নিজেকে চিনে নেয়, কৃষি পেশাকে শ্রদ্ধা করে এবং গ্রামকে ভালোবাসে।",
      descEn: "A supportive education center for children to learn alongside developing nature awareness, respecting agriculture, and loving rural heritage.",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  return (
    <div className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
            {language === "bn" ? "আমাদের কথা" : "About Jiyonkathi"}
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl leading-tight">
            {language === "bn"
              ? "জিয়নকাঠি: একটি টেকসই জীবনযাপনের সমাজ"
              : "Jiyonkathi: A Sustainable Living Community"}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-medium">
            {siteData?.about?.intro || BENGALI_CONTENT.about.intro}
          </p>
        </div>

        {/* 4 Bengali Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cardItems.map((card) => (
            <div
              key={card.id}
              className="bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-5 hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="w-8 h-8 rounded-full bg-stone-200/80 text-stone-700 font-bold text-sm flex items-center justify-center">
                    {card.letter}
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-lg leading-snug">
                  {language === "bn" ? card.titleBn : card.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {language === "bn" ? card.descBn : card.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Photo Showcase Collage */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-stone-900">
              {language === "bn" ? "জিয়নকাঠির মাঠের বাস্তব চিত্র" : "Authentic Field Glimpses"}
            </h3>
            <p className="text-sm text-stone-600">
              {language === "bn"
                ? "কৃষি, শিক্ষা, লোকসংস্কৃতি ও প্রাকৃতিক সম্পদের বাস্তব ফটোগ্রাফিক রেকর্ড"
                : "Real photographic documentation of our farming, education, and community work"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm group">
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/farming-collage.jpg"
                  alt="Indigenous Organic Farming Operations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-bold text-stone-900 text-sm">
                  {language === "bn" ? "দেশীয় ধান ও বীজ সংরক্ষণ প্রক্রিয়া" : "Indigenous Paddy & Seed Processing"}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  বীজতলা, নিড়ানো, ধান কাটা, ঢেঁকিতে প্রক্রিয়াজাতকরণ ও প্রজাতি সংরক্ষণ।
                </p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm group">
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/community-collage.jpg"
                  alt="Community Education & Cultural Events"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-bold text-stone-900 text-sm">
                  {language === "bn" ? "সামাজিক শিক্ষা ও সাংস্কৃতিক মেলবন্ধন" : "Community Education & Festival"}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  সহায়ক শিক্ষা কেন্দ্র, বসন্ত উৎসব, সর্প সচেতনতা ও স্বাস্থ্য শিবির।
                </p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm group">
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/ecology-collage.jpg"
                  alt="Ecology & Biodiversity Yield"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-bold text-stone-900 text-sm">
                  {language === "bn" ? "বিষমুক্ত ফসল ও প্রাকৃতিক জীববৈচিত্র্য" : "Organic Produce & Biodiversity"}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  বিষমুক্ত ফল, বীজ সংরক্ষণের বোতল, স্থানীয় মৎস্য ও প্রাকৃতিক বাস্তুতন্ত্র।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership / Auxiliary Info Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-800 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-bold uppercase tracking-wider text-emerald-300">
              {language === "bn" ? "সহযোগিতা ও অংশীদারিত্ব" : "Partnership & Collaboration"}
            </h3>
          </div>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            {language === "bn" ? (
              <>
                বিগত দুই বছর ধরে এই কাজগুলি এবং দেশীয় বীজ সংরক্ষণের কাজ সম্পন্ন করার লক্ষ্যে জিয়নকাঠির পাশে এসে দাঁড়িয়েছে{" "}
                <strong className="text-white">“দুর্গাপুর দক্ষিণবঙ্গীয় মানবিক প্রাকৃতিক বিকাশ সোসাইটি (DDBMPBS)”</strong>। যৌথ প্রচেষ্টায় জিয়নকাঠি ও DDBMPBS বৃহত্তর গ্রামীণ বিকাশ ও টেকসই পরিবেশ গড়ে তোলার লক্ষ্যে নিয়োজিত।
              </>
            ) : (
              <>
                For the past two years, <strong className="text-white">&quot;Durgapur Dakshinbanga Manabik Prakritik Bikash Society (DDBMPBS)&quot;</strong> has partnered with Jiyonkathi to conserve indigenous seed varieties, promote organic farming, and uplift rural education.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
