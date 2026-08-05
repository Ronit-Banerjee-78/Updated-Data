"use client";

import React, { useState, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import {
  HandHelping,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function Footer({ setActiveTab }) {
  const { siteData } = useContext(SiteContext);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-stone-950 text-stone-300">
      {/* Top CTA Banner */}
      <div
        id="footer-cta-banner"
        className="border-b border-stone-800 bg-gradient-to-r from-stone-900 to-stone-950 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Want to see our work firsthand?
              </h3>
              <p className="text-sm text-stone-400 mt-1">
                Sign up for our monthly transparent impact newsletter reports.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto max-w-md items-center space-x-2"
          >
            <div className="relative flex-grow">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 text-sm rounded-xl py-3 pl-4 pr-10 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />

              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-500" />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center space-x-2 shrink-0 active:scale-95"
            >
              <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
              {!subscribed && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="max-w-7xl mx-auto mt-3 text-center md:text-right">
            <p className="text-emerald-400 text-xs flex items-center justify-center md:justify-end space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                Thank you! You are now subscribed to quarterly field logs.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="Jiyonkathi Logo"
                className="h-10 w-auto object-contain bg-stone-900 p-1 rounded-xl"
              />
              <div>
                <span className="text-lg font-bold text-white tracking-tight flex items-center space-x-1.5">
                  <span>Jiyonkathi</span>
                  <span className="text-emerald-400 font-semibold text-sm">(জিয়নকাঠি)</span>
                </span>
                <span className="text-[10px] text-stone-400 block font-medium">A Sustainable Living Community</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              সঞ্চিত আনন্দ, সচেতনতা এবং দায়িত্ববোধ থেকে তৈরি হওয়া এক স্বপ্নের গল্প হল “জিয়নকাঠি”। প্রাণ-প্রকৃতি-পরিবেশের সঙ্গে টেকসই জীবনের মেলবন্ধন।
            </p>
            <div className="flex space-x-4">
              <span className="text-xs text-stone-500">
                Aushgram, Purba Bardhaman, WB
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Explore Organization
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick("home")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("about")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Story & Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("mission")}
                  className="hover:text-emerald-400 transition-colors font-medium text-emerald-400"
                >
                  Our Mission / আমাদের লক্ষ্য
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("work")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("members")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Members
                </button>
              </li>
            </ul>
          </div>

          {/* More Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Additional Links
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick("events")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Community Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("gallery")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("blog")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Field Logs & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("donation")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Donation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("contact")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-xs leading-relaxed">
              <li className="flex items-start space-x-3 text-stone-300">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">Jiyonkathi, (জিয়নকাঠি)</p>
                  <p>Plot no. 1942</p>
                  <p>Village: Pratappur, P.O.- Pratappur</p>
                  <p>PS: Aushgram, Dist: Barddhaman</p>
                  <p>PIN: 71314</p>
                  <a
                    href="https://maps.app.goo.gl/7eJagTKxeWjGfzHf8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-emerald-400 font-semibold hover:underline mt-1.5"
                  >
                    <span>Google Maps Location</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-stone-300">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+91 94332 87654 / +91 98301 23456</span>
              </li>
              <li className="flex items-center space-x-3 text-stone-300">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>contact@jiyonkathi.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        id="footer-bottom-bar"
        className="bg-stone-950 border-t border-stone-900 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-stone-500">
          <p>
            © 2026 {siteData.general.logoText} Foundation. Certified 501(c)(3) Charitable
            Trust. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => handleLinkClick("about")}
              className="hover:text-stone-300 transition-colors"
            >
              Transparency Disclosure
            </button>
            <button
              onClick={() => handleLinkClick("about")}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLinkClick("contact")}
              className="hover:text-stone-300 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
