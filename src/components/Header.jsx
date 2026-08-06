"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

import {
  Heart,
  Menu,
  X,
  ChevronDown,
  UserPlus,
  Info,
  Gift,
  Calendar,
  Home,
  BookOpen,
  Image as ImageIcon,
  Mail,
  User,
  Users,
  Compass,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Eye,
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

  const isAdmin = userSession && userSession.role === "admin";

  // Navigation items for normal visitors
  const navigationItems = [
    { id: "home", label: language === "bn" ? "প্রচ্ছদ" : "Home", icon: <Home className="w-4 h-4" /> },
    { id: "about", label: language === "bn" ? "আমাদের কথা" : "About Us", icon: <Info className="w-4 h-4" /> },
    { id: "mission", label: language === "bn" ? "আমাদের লক্ষ্য" : "Our Mission", icon: <Compass className="w-4 h-4" /> },
    { id: "work", label: language === "bn" ? "আমাদের কাজ" : "Our Work", icon: <Briefcase className="w-4 h-4" /> },
    { id: "volunteer", label: language === "bn" ? "স্বেচ্ছাসেবী" : "Volunteer", icon: <UserPlus className="w-4 h-4" /> },
    { id: "gallery", label: language === "bn" ? "গ্যালারি" : "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "events", label: language === "bn" ? "অনুষ্ঠানসূচী" : "Events", icon: <Calendar className="w-4 h-4" /> },
    { id: "blog", label: language === "bn" ? "ব্লগ" : "Blog", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const moreItems = [
    { id: "members", label: language === "bn" ? "সদস্যবৃন্দ" : "Members", icon: <Users className="w-4 h-4" /> },
    { id: "contact", label: language === "bn" ? "যোগাযোগ" : "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  // Dedicated streamlined menu for Admin
  const adminNavigationItems = [
    {
      id: "admin",
      label: language === "bn" ? "ড্যাশবোর্ড" : "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      isPrimary: true,
    },
    {
      id: "home",
      label: language === "bn" ? "ওয়েবসাইট দেখুন" : "View Site",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "volunteer",
      label: language === "bn" ? "স্বেচ্ছাসেবক" : "Volunteers",
      icon: <UserPlus className="w-4 h-4" />,
    },
    {
      id: "gallery",
      label: language === "bn" ? "গ্যালারি" : "Gallery",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: "blog",
      label: language === "bn" ? "ব্লগ" : "Blogs",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setUserSession(null);
    setActiveTab("home");
    setIsMobileMenuOpen(false);
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
            onClick={() => handleTabClick(isAdmin ? "admin" : "home")}
          >
            {/* Logo Image */}
            <div className="relative flex items-center justify-center bg-stone-900 p-1.5 rounded-xl border border-stone-800 shadow-sm">
              <img
                src="/images/logo.png"
                alt="Jiyonkathi Logo (জিয়নকাঠি)"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
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
                {isAdmin ? "Admin Control Panel" : "A Sustainable Living Community"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-1"
          >
            {isAdmin ? (
              /* Admin Specific Navigation Bar */
              <div className="flex items-center space-x-1 bg-stone-100/70 p-1 rounded-2xl border border-stone-200">
                {adminNavigationItems.map((item) => (
                  <button
                    key={item.id}
                    id={`admin-nav-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === item.id || (item.id === "admin" && activeTab === "portal")
                      ? item.isPrimary
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                        : "bg-white text-emerald-800 shadow-sm border border-stone-200"
                      : "text-stone-700 hover:text-emerald-700 hover:bg-white/60"
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* Visitor Navigation Bar */
              <>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
                      ? "bg-emerald-50 text-emerald-700 font-bold"
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
                      ? "bg-emerald-50 text-emerald-700 font-bold"
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
              </>
            )}
          </nav>

          {/* CTA Buttons / Admin Actions & Language Switcher (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 pl-3">
            <button
              id="language-switcher-btn"
              onClick={toggleLanguage}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-2.5 rounded-xl border border-stone-200 transition-all flex items-center space-x-1.5"
              title="Change Language / ভাষা পরিবর্তন করুন (India / ভারত)"
            >
              <span className="text-base">🇮🇳</span>
              <span>{language === "bn" ? "বাংলা (India)" : "English (IN)"}</span>
            </button>

            {isAdmin && (
              /* Admin Specific Action Controls */
              <div className="flex items-center space-x-2">
                <div
                  id="admin-status-badge"
                  className="hidden xl:flex items-center space-x-1.5 px-3 py-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Admin Session (7 days)</span>
                </div>

                <button
                  id="header-logout-btn"
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-1.5 active:scale-95"
                  title="Logout from Admin account"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}
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

            {isAdmin && (
              <button
                id="mobile-admin-dashboard-btn"
                onClick={() => handleTabClick("admin")}
                className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-sm flex items-center justify-center"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
            )}

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
          {isAdmin ? (
            /* Admin Mobile Drawer */
            <>
              <div className="flex items-center justify-between px-3 py-2 bg-amber-50 rounded-xl border border-amber-200 mb-2">
                <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Admin Session Active (7d)</span>
                </div>
              </div>

              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-1">
                Admin Operations
              </div>

              {adminNavigationItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-admin-nav-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id || (item.id === "admin" && activeTab === "portal")
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                    : "text-stone-700 hover:bg-stone-100"
                    }`}
                >
                  <span className={activeTab === item.id ? "text-white" : "text-emerald-600"}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="pt-3 border-t border-stone-100 px-2">
                <button
                  id="mobile-drawer-logout-btn"
                  onClick={handleLogout}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm py-3 rounded-xl text-center shadow-sm flex items-center justify-center space-x-2 transition-all"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Logout Admin Account</span>
                </button>
              </div>
            </>
          ) : (
            /* Public Mobile Drawer */
            <>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-2">
                Primary Pages
              </div>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                    ? "bg-emerald-50 text-emerald-700 font-bold"
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
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-stone-600 hover:bg-stone-50"
                    }`}
                >
                  <span className="text-emerald-500">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </header>
  );
}

