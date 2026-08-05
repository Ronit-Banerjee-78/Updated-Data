"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

import {
  Image as ImageIcon,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function GallerySection() {
  const { siteData } = useContext(SiteContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImageIdx, setSelectedImageIdx] = useState(null);

  const filteredItems = siteData.gallery.filter((item) => {
    const itemCat = item.category || 'events';
    return activeCategory === "all" || itemCat === activeCategory;
  });

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((prev) =>
        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1,
      );
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((prev) =>
        prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0,
      );
    }
  };

  return (
    <div id="gallery-section" className="space-y-16 pb-24">
      {/* Header */}
      <section
        id="gallery-header"
        className="bg-stone-50 border-b border-stone-200 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
            Moments of Jiyonkathi
          </span>
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
            Our Photo Gallery
          </h1>
          <p className="text-base text-stone-500 max-w-2xl mx-auto">
            A visual archive of smile delivery, clinic deployments, textbook
            unpacking, and hard-working volunteer campaigns.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-lg mx-auto bg-white p-2 rounded-2xl border border-stone-200 shadow-sm">
          {["all", "campaigns", "events", "impact"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-stone-50 hover:text-emerald-600"
              }`}
            >
              {cat === "all" ? "All Photos" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImageIdx(idx)}
                className="group relative bg-stone-950 rounded-2xl overflow-hidden aspect-4/3 shadow-sm hover:shadow-md cursor-pointer transition-all border border-stone-200"
              >
                {item.type === 'Video' ? (
                  <video
                    key={item.url}
                    src={item.url}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 space-y-2">
                  <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded self-start">
                    {item.category || 'events'}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 leading-normal">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold pt-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200 space-y-3">
            <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">
              No photos cataloged here yet.
            </h3>
            <p className="text-xs text-stone-400">
              We are adding new campaign snapshots weekly.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox / Slideshow Modal */}
      {selectedImageIdx !== null && (
        <div
          id="lightbox-overlay"
          onClick={() => setSelectedImageIdx(null)}
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 select-none"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white relative z-10 w-full max-w-7xl mx-auto">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                Jiyonkathi Photo Archives
              </span>
              <span className="text-xs font-bold text-stone-400">
                Photo {selectedImageIdx + 1} of {filteredItems.length}
              </span>
            </div>
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage with arrows */}
          <div className="relative flex items-center justify-center flex-grow max-w-5xl mx-auto w-full my-6">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-16 z-20 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central Image container */}
            <div 
              className="relative max-h-[65vh] max-w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[selectedImageIdx].type === 'Video' ? (
                <video
                  key={filteredItems[selectedImageIdx].url}
                  src={filteredItems[selectedImageIdx].url}
                  className="max-h-[65vh] w-auto max-w-full object-contain animate-in fade-in zoom-in-95 duration-200"
                  controls
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={filteredItems[selectedImageIdx].url}
                  alt={filteredItems[selectedImageIdx].title}
                  className="max-h-[65vh] w-auto max-w-full object-contain animate-in fade-in zoom-in-95 duration-200"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-16 z-20 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-2xl text-center text-white max-w-3xl mx-auto w-full relative z-10 space-y-2">
            <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md inline-block">
              Category: {filteredItems[selectedImageIdx].category || 'events'}
            </span>
            <h3 className="font-bold text-base sm:text-lg tracking-tight">
              {filteredItems[selectedImageIdx].title}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-2xl mx-auto">
              {filteredItems[selectedImageIdx].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
