"use client";

import React, { useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { Compass, Target, HeartHandshake, Sprout, BookOpen, ShieldCheck, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export default function MissionSection() {
  const { siteData, language } = useContext(SiteContext);

  const customProjects = (siteData && siteData.work && siteData.work.length > 0)
    ? siteData.work.map(w => ({
      id: w.id,
      titleBn: w.titleBengali || w.title,
      titleEn: w.titleEnglish || w.title,
      descBn: w.descriptionBengali || w.description,
      descEn: w.descriptionEnglish || w.description,
      categoryBn: w.category || "আমাদের কাজ",
      categoryEn: w.category || "Our Work",
      location: w.location || "Pratappur, Aushgram",
      impact: w.impact,
      url: w.image
    }))
    : null;

  const missionPoints = [
    {
      num: "১",
      numEn: "1",
      titleBn: "পরিবেশ-সংক্রান্ত সচেতনতা",
      titleEn: "Environmental Consciousness & Guidance",
      descBn: "পরিবেশ-সংক্রান্ত সচেতনতা বজায় রেখে কীভাবে এই মঞ্চ আরও কার্যকরী হতে পারে, তার দিশা দেখানো।",
      descEn: "Guiding strategies to maintain deep environmental awareness and enhance the community platform's impact.",
      icon: <Compass className="w-6 h-6 text-emerald-600" />
    },
    {
      num: "২",
      numEn: "2",
      titleBn: "সামাজিক ও পরিবেশবান্ধব অংশগ্রহণ",
      titleEn: "Active Social & Eco Contribution",
      descBn: "এখানে হয়ে চলা সামাজিক এবং প্রকৃতিবান্ধব কাজকে সম্পন্ন করার জন্য শারীরিক, মানসিক এবং আর্থিক অবদান রাখা।",
      descEn: "Contributing physically, mentally, and financially to execute social, ecological, and rural welfare initiatives.",
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />
    },
    {
      num: "৩",
      numEn: "3",
      titleBn: "কৃষকদের উৎসাহ ও জৈব চাষ",
      titleEn: "Empowering Local Organic Farmers",
      descBn: "গ্রামের অন্য চাষিদের আগামী দিনের প্রকৃতিবান্ধব উৎপাদনে উৎসাহ দিতে সচেষ্ট থাকা।",
      descEn: "Encouraging local rural farmers to adopt natural, chemical-free organic farming and indigenous seed preservation.",
      icon: <Sprout className="w-6 h-6 text-emerald-600" />
    },
    {
      num: "৪",
      numEn: "4",
      titleBn: "জ্ঞান আদান-প্রদান ও সুস্থায়ী ভবিষ্যৎ",
      titleEn: "Knowledge Exchange for Sustainable Future",
      descBn: "সর্বোপরি এই মঞ্চের মাধ্যমে, সুস্থায়ী ভবিষ্যৎ তৈরির লক্ষ্যে জ্ঞান আদান-প্রদানের একটি ধারা বিকশিত করা।",
      descEn: "Fostering open knowledge-sharing across rural and urban communities to build a sustainable and resilient future.",
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />
    }
  ];

  const photoHighlights = [
    {
      titleBn: "বীজতলা তৈরি ও বীজ রোপণ",
      titleEn: "Paddy Seedbed Preparation & Sowing",
      categoryBn: "জৈব কৃষি",
      categoryEn: "Organic Paddy",
      url: "/images/seedbed.jpg"
    },
    {
      titleBn: "ধান রোপণ ও নিড়ানো (রোপোণ কাজ)",
      titleEn: "Paddy Transplanting & Weeding",
      categoryBn: "বিষমুক্ত চাষ",
      categoryEn: "Pesticide-Free",
      url: "/images/paddy-planting.jpg"
    },
    {
      titleBn: "ধান কাটা ও ফসল মাড়াই",
      titleEn: "Harvesting & Threshing",
      categoryBn: "ফসলের মরশুম",
      categoryEn: "Harvest Season",
      url: "/images/paddy-harvesting.jpg"
    },
    {
      titleBn: "কৃষি প্রক্রিয়া ও ঢেঁকিতে প্রক্রিয়াজাতকরণ",
      titleEn: "Indigenous Rice & Dheki Processing",
      categoryBn: "ঐতিহ্যবাহী লোকশিল্প",
      categoryEn: "Heritage Technique",
      url: "/images/farming-collage.jpg"
    },
    {
      titleBn: "দেশীয় প্রজাতি বীজ সংরক্ষণ ও জীববৈচিত্র্য",
      titleEn: "Indigenous Seed & Crop Preservation",
      categoryBn: "বীজ সুরক্ষা",
      categoryEn: "Seed Conservation",
      url: "/images/ecology-collage.jpg"
    },
    {
      titleBn: "সহায়ক শিক্ষা কেন্দ্র ও সর্প সচেতনতা",
      titleEn: "Auxiliary Education & Community Camps",
      categoryBn: "গ্রামীণ শিক্ষা",
      categoryEn: "Rural Education",
      url: "/images/education-center.jpg"
    }
  ];

  return (
    <div className="py-16 bg-stone-50 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Banner Section matching PDF Page 2 styling */}
        <div className="bg-stone-100 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-stone-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{language === "bn" ? "আমাদের মূল দিশা ও আদর্শ" : "Our Core Mission & Vow"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight leading-tight">
              JIYONKATHI (জিয়নকাঠি)
            </h1>
            <p className="text-xl font-bold text-stone-800">
              A Sustainable Living Community
            </p>
            <p className="text-sm sm:text-base text-stone-600 font-serif italic border-l-2 border-emerald-500 pl-4 py-1">
              &quot;An effort to transition to the Post-Petroleum World — Committed to changing our lifestyles to sustainable ones.&quot;
            </p>
          </div>
        </div>

        {/* Core Vision Statement from PDF Page 10 */}
        <div className="bg-stone-100 rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-3 text-emerald-700">
            <Target className="w-8 h-8 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {language === "bn" ? "আমাদের মূল ঘোষণা ও স্বপ্ন" : "Our Fundamental Mission & Philosophy"}
            </h2>
          </div>

          <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-6 sm:p-8 rounded-r-2xl">
            <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed italic">
              {language === "bn"
                ? "“আমাদের ব্যক্তিগত জীবনে, আমরা যে যে ভাবে পরিবেশের বর্তমান বিপদকে অনুধাবন করতে পারছি, এবং নিজেদের ক্ষমতার মধ্যে থেকে এই বিশ্বজুড়ে ঘনিয়ে আসা বিপদের বিরুদ্ধে স্থানীয় স্তরে সংঘবদ্ধ হতে চাইছি, তাদের সকলকে একসাথে, এক মঞ্চে আনার শুরুর একটি চেষ্টার নাম হোক 'জিয়নকাঠি'।”"
                : "“In our personal lives, as we perceive the environmental crises deepening across the globe, 'Jiyonkathi' stands as an effort to unite like-minded people at the local level, taking collective action within our capacity for a sustainable future.”"}
            </p>
          </div>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === "bn"
              ? "এই সকল কাজের জন্য প্রাথমিকভাবে প্রস্তুত জিয়নকাঠি এবং DDBMPBS (দুর্গাপুর দক্ষিণপল্লীয় মানবিক প্রাকৃতিক বিকাশ সোসাইটি), আরও বৃহত্তর লক্ষ্যে, মানুষের সাথে যুক্ত হয়ে কাজ করতে চায়। যেখানে যুক্ত হওয়া সদস্যরা চার মূল স্তরে অবদান রাখেন।"
              : "Initially prepared by Jiyonkathi and DDBMPBS (Durgapur Dakshinpalliya Manabik Prakritik Bikash Society), this platform aims to work closely with local communities toward ecological conservation and rural development."}
          </p>
        </div>

        {/* 4 Mission Pillar Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-stone-900">
              {language === "bn" ? "আমাদের ৪টি মূল সদস্য দায়িত্ব" : "Key Mission Directives"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === "bn" ? "প্রতিটি সদস্যের সক্রিয় অংশগ্রহণের মাধ্যমেই তৈরি হচ্ছে আমাদের সুস্থায়ী ভবিষ্যৎ।" : "Every action contributes directly to local nature preservation and community welfare."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPoints.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex items-start space-x-5"
              >
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 flex-shrink-0">
                  {pt.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono">
                      {language === "bn" ? `স্তম্ভ ${pt.num}` : `Pillar ${pt.numEn}`}
                    </span>
                    <h4 className="font-extrabold text-stone-900 text-base sm:text-lg">
                      {language === "bn" ? pt.titleBn : pt.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === "bn" ? pt.descBn : pt.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Showcase of Field Operations */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-lg space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                {language === "bn" ? "নথিপত্র ও ক্ষেত্রের রূপরেখা" : "Field Operations & Document Showcase"}
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 mt-2">
                {language === "bn" ? "জিয়নকাঠির দৈনন্দিন কার্যক্রম" : "Glimpses of Jiyonkathi Activities"}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-500 bg-stone-100 px-3 py-2 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Pratappur, Aushgram, WB</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(customProjects || photoHighlights).map((pic, idx) => (
              <div key={pic.id || idx} className="group bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden relative bg-stone-900">
                    {pic.url ? (
                      <img
                        src={pic.url}
                        alt={pic.titleBn || pic.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 p-5 flex flex-col justify-between text-white">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                          {language === "bn" ? pic.categoryBn : pic.categoryEn}
                        </span>
                        <p className="text-sm font-bold text-stone-100 line-clamp-3 leading-snug">
                          {language === "bn" ? pic.titleBn : pic.titleEn}
                        </p>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      {language === "bn" ? pic.categoryBn : pic.categoryEn}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-extrabold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {language === "bn" ? pic.titleBn : pic.titleEn}
                    </h4>
                    {(pic.descBn || pic.descEn) && (
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {language === "bn" ? pic.descBn : pic.descEn}
                      </p>
                    )}
                  </div>
                </div>

                {(pic.location || pic.impact) && (
                  <div className="px-5 pb-4 pt-0 flex flex-wrap items-center justify-between text-[11px] text-stone-500 border-t border-stone-200/60 pt-3 mt-1">
                    {pic.location && (
                      <span className="flex items-center space-x-1 font-semibold text-stone-600">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{pic.location}</span>
                      </span>
                    )}
                    {pic.impact && (
                      <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                        {pic.impact}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Society Collaboration Footer Box */}
        <div className="bg-emerald-950 text-white p-8 sm:p-10 rounded-3xl border border-emerald-900 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Institutional Partner</span>
            </div>
            <h4 className="text-xl font-extrabold">
              {language === "bn"
                ? "দুর্গাপুর দক্ষিণপল্লীয় মানবিক প্রাকৃতিক বিকাশ সোসাইটি (DDBMPBS)"
                : "Durgapur Dakshinpalliya Manabik Prakritik Bikash Society"}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {language === "bn"
                ? "বীজ সংরক্ষণ, সর্প সচেতনতা শিবির, চিকিৎসা শিবির ও গ্রামীণ শিক্ষার্থীদের সহায়ক শিক্ষা প্রদানে জিয়নকাঠির সাথে যৌথভাবে নিরবচ্ছিন্নভাবে কাজ করে চলেছে।"
                : "Working hand in hand with Jiyonkathi in indigenous seed preservation, snake bite awareness, rural health camps, and children's education."}
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-emerald-900/80 px-5 py-3 rounded-2xl border border-emerald-800 shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-white">Registered Society & Non-Profit</span>
          </div>
        </div>

      </div>
    </div>
  );
}
