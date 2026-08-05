"use client";

import React, { createContext, useState, useEffect } from 'react';
import { GALLERY_ITEMS, WELFARE_PROJECTS, BENGALI_CONTENT, DEFAULT_VIDEOS, BLOGS } from '../data';
import { settingsService } from '../services/settingsService';

export const SiteContext = createContext();

const defaultSiteData = {
  general: {
    logoText: "Jiyonkathi",
    bannerHeading: "Transitioning to a Post-Petroleum World",
    bannerHeadingBengali: "জিয়নকাঠি: একটি টেকসই জীবনযাপনের সমাজ",
    bannerText: BENGALI_CONTENT.home.narrative,
    address: BENGALI_CONTENT.home.address,
    googleMapsUrl: BENGALI_CONTENT.home.googleMapsUrl,
    facebookUrl: BENGALI_CONTENT.home.facebookUrl
  },
  homepageVideo: {
    title: DEFAULT_VIDEOS[0].title,
    titleEnglish: DEFAULT_VIDEOS[0].titleEnglish,
    url: DEFAULT_VIDEOS[0].url,
    autoplay: false,
    showInGallery: true,
    showInBlog: true,
    description: DEFAULT_VIDEOS[0].description
  },
  videos: DEFAULT_VIDEOS,
  about: {
    intro: BENGALI_CONTENT.about.intro,
    text: BENGALI_CONTENT.about.intro,
    principles: BENGALI_CONTENT.about.principles,
    educationCenter: BENGALI_CONTENT.about.educationCenter
  },
  mission: BENGALI_CONTENT.mission,
  members: [
    { id: 1, name: "Raju Mandal", role: "Lead Farmer & Seed Conservator", bio: "Expert in indigenous seed conservation and organic paddy cultivation." },
    { id: 2, name: "Sarmistha Roy", role: "Education Coordinator", bio: "Oversees the auxiliary education center and children nature awareness." },
    { id: 3, name: "Arindam Das", role: "Sustainability Expert", bio: "Guides energy transition, renewable energy & community outreach." }
  ],
  gallery: [
    ...DEFAULT_VIDEOS.filter(v => v.showInGallery).map((v, i) => ({
      id: `vid-gal-${v.id}`,
      type: "Video",
      url: v.url,
      title: v.title,
      category: v.category || "campaigns",
      description: v.description
    })),
    ...GALLERY_ITEMS.map((item, idx) => ({ ...item, id: idx + 10 }))
  ],
  blogs: [
    ...DEFAULT_VIDEOS.filter(v => v.showInBlog).map((v, i) => ({
      id: `vid-blog-${v.id}`,
      type: "video",
      title: v.title,
      excerpt: v.description,
      videoUrl: v.url,
      author: "Admin (Jiyonkathi Team)",
      date: v.date || "August 2026",
      category: "Video Documentary"
    })),
    ...BLOGS.map((b, i) => ({ ...b, id: i + 10, type: "article" }))
  ],
  work: WELFARE_PROJECTS.map((project, idx) => ({ ...project, id: project.id || idx + 1 }))
};

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(defaultSiteData);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('bn'); // 'bn' for Bengali, 'en' for English

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.fetchSettings();
        if (data && data.success && data.data && typeof data.data === 'object') {
          setSiteData((prev) => ({
            ...prev,
            ...data.data,
            general: { ...prev.general, ...(data.data.general || {}) },
            about: { ...prev.about, ...(data.data.about || {}) },
          }));
        }
      } catch (error) {
        console.warn("Using default site data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const saveSiteData = async (newData) => {
    try {
      setSiteData(newData);
      await settingsService.saveSettings({ data: newData });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <SiteContext.Provider value={{ siteData, setSiteData: saveSiteData, loading, language, setLanguage, toggleLanguage }}>
      {children}
    </SiteContext.Provider>
  );
};
