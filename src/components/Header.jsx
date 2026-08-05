"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

import {
  Heart,
  Menu,
  X,
  ChevronDown,
  HandHelping,
  Info,
  Gift,
  Calendar,
  Home,
  BookOpen,
  Image,
  Mail,
  User,
  Users,
  Compass,
  Briefcase
} from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
  userSession,
  setUserSession,
}) {
  const { siteData, language, toggleLanguage } = useContext(SiteContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: language === "bn" ? "প্রচ্ছদ" : "Home", icon: <Home className="w-4 h-4" /> },
    { id: "about", label: language === "bn" ? "আমাদের কথা" : "About Us", icon: <Info className="w-4 h-4" /> },
    { id: "mission", label: language === "bn" ? "আমাদের লক্ষ্য" : "Our Mission", icon: <Compass className="w-4 h-4" /> },
    { id: "work", label: language === "bn" ? "আমাদের কাজ" : "Our Work", icon: <Briefcase className="w-4 h-4" /> },
    { id: "volunteer", label: language === "bn" ? "স্বেচ্ছাসেবী" : "Volunteer", icon: <HandHelping className="w-4 h-4" /> },
    { id: "gallery", label: language === "bn" ? "গ্যালারি" : "Gallery", icon: <Image className="w-4 h-4" /> },
    { id: "events", label: language === "bn" ? "অনুষ্ঠানসূচী" : "Events", icon: <Calendar className="w-4 h-4" /> },
    { id: "blog", label: language === "bn" ? "ব্লগ" : "Blog", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const moreItems = [
    { id: "contact", label: language === "bn" ? "যোগাযোগ" : "Contact", icon: <Mail className="w-4 h-4" /> },
    { id: "donation", label: language === "bn" ? "দান করুন" : "Donation", icon: <Gift className="w-4 h-4" /> },
    { id: "members", label: language === "bn" ? "সদস্যবৃন্দ" : "Members", icon: <Users className="w-4 h-4" /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            id="header-logo-container"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleTabClick("home")}
          >
            {/* Logo Image */}
            <div className="relative flex items-center justify-center bg-stone-900 p-1.5 rounded-xl border border-stone-800 shadow-sm">
              <img
                src="/images/logo.png"
                alt="Jiyonkathi Logo (জিয়নকাঠি)"
                className="h-auto w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-stone-900 block leading-tight">
                  Jiyonkathi
                </span>
                <span className="text-emerald-700 text-base font-bold">
                  (জিয়নকাঠি)
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-medium block leading-none mt-0.5">
                A Sustainable Living Community
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-1"
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-stone-600 hover:text-emerald-600 hover:bg-stone-50"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* More Items Dropdown */}
            <div className="relative">
              <button
                id="nav-more-dropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${moreItems.some((item) => item.id === activeTab)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-stone-600 hover:text-emerald-600 hover:bg-stone-50"
                  }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  id="more-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                >
                  {moreItems.map((item) => (
                    <button
                      key={item.id}
                      id={`dropdown-${item.id}`}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center space-x-3 w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${activeTab === item.id
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-stone-600 hover:text-emerald-600 hover:bg-stone-50"
                        }`}
                    >
                      <span className="text-emerald-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons & Language Switcher (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="language-switcher-btn"
              onClick={toggleLanguage}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-2.5 rounded-xl border border-stone-200 transition-all flex items-center space-x-1.5"
              title="Change Language / ভাষা পরিবর্তন করুন (India / ভারত)"
            >
              <span className="text-base">🇮🇳</span>
              <span>{language === "bn" ? "বাংলা (India)" : "English (IN)"}</span>
            </button>

            <button
              id="header-donate-btn"
              onClick={() => handleTabClick("donation")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95 transition-all duration-200 flex items-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>{language === "bn" ? "দান করুন" : "Donate Now"}</span>
            </button>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-language-switcher-btn"
              onClick={toggleLanguage}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-2.5 py-2 rounded-xl border border-stone-200 transition-all flex items-center space-x-1"
            >
              <span className="text-xs">🇮🇳 {language === "bn" ? "বাংলা (IN)" : "English (IN)"}</span>
            </button>

            <button
              id="mobile-donate-cta"
              onClick={() => handleTabClick("donation")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-sm"
              title="Donate Now"
            >
              <Gift className="w-5 h-5" />
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-500 hover:bg-stone-100 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-stone-100 bg-white/95 backdrop-blur-md py-4 px-4 space-y-1.5 shadow-inner animate-in slide-in-from-top duration-300"
        >
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-2">
            Primary Pages
          </div>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                ? "bg-emerald-50 text-emerald-700"
                : "text-stone-600 hover:bg-stone-50"
                }`}
            >
              <span className="text-emerald-500">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 pt-3 pb-2 border-t border-stone-50">
            More Information
          </div>
          {moreItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-more-${item.id}`}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                ? "bg-emerald-50 text-emerald-700"
                : "text-stone-600 hover:bg-stone-50"
                }`}
            >
              <span className="text-emerald-500">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 border-t border-stone-100 flex flex-col space-y-2 px-3">
            <button
              id="mobile-drawer-donate-btn"
              onClick={() => handleTabClick("donation")}
              className="w-full bg-emerald-600 text-white font-semibold text-sm py-3 rounded-xl text-center shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
