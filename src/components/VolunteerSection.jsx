"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Heart, Sparkles, CheckCircle2, Send, MapPin, Calendar, BookOpen, Leaf, Shield, UserCheck } from "lucide-react";
// import { getApiUrl } from "../services/apiClient";

export default function VolunteerSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "Indigenous Farming & Seed Conservation",
    location: "",
    availability: "Weekends",
    skills: "",
    motivation: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit volunteer form. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting volunteer application:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="volunteer-section" className="space-y-16 pb-24">
      {/* Header */}
      <section id="volunteer-header" className="bg-stone-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/images/community-collage.jpg"
            alt="Volunteers at Jiyonkathi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Sustainable Living Community</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Become a Volunteer
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
            জিয়নকাঠির সাথে যুক্ত হয়ে গ্রামজীবনের ছন্দ, দেশীয় বীজ সংরক্ষণ, সহায়ক শিক্ষা কেন্দ্র ও প্রকৃতিবান্ধব কৃষিতে ভূমিকা রাখুন।
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
                Why Volunteer With Us?
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Make a Real Difference in Rural Bengal
              </h2>
              <p className="text-stone-600 mt-3 leading-relaxed text-sm">
                Volunteers at Jiyonkathi work directly with local farmers, children, and indigenous communities in Ausgram, Purba Bardhaman.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex items-start space-x-4">
                <div className="bg-emerald-600 text-white p-3 rounded-xl shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Indigenous Seed Conservation</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Participate in preserving native paddy and vegetable varieties without chemical fertilizers or deep groundwater extraction.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex items-start space-x-4">
                <div className="bg-emerald-600 text-white p-3 rounded-xl shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Auxiliary Education Center</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Teach local children formal education alongside environmental awareness and respect for farming professions.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex items-start space-x-4">
                <div className="bg-emerald-600 text-white p-3 rounded-xl shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Community & Cultural Events</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Help organize health &amp; snake awareness camps, and celebrate the annual &quot;Nabanna&quot; harvest festival.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-stone-200 p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Field Location</span>
              </div>
              <p className="text-sm font-medium">
                জিয়নকাঠি, গ্রামঃ প্রতাপপুর, আউশগ্রাম, পূর্ব বর্ধমান, পশ্চিমবঙ্গ
              </p>
              <a
                href="https://maps.app.goo.gl/834zW2udHM2GWJTF9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:underline font-bold"
              >
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-stone-900">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    ধন্যবাদ, <strong>{formData.name}</strong>! আপনার স্বেচ্ছাসেবক আবেদন আমাদের কাছে পৌঁছেছে। আমাদের দল শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      program: "Indigenous Farming & Seed Conservation",
                      location: "",
                      availability: "Weekends",
                      skills: "",
                      motivation: ""
                    });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-stone-900">
                    Volunteer Application Form
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Please fill out the details below to join our team.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Das"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98300 00000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Your Location / District
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Purba Bardhaman / Kolkata"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Preferred Initiative / Program
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    >
                      <option value="Indigenous Farming & Seed Conservation">
                        Indigenous Farming & Seed Conservation (দেশীয় ধান ও বীজ)
                      </option>
                      <option value="Auxiliary Education Center">
                        Auxiliary Education Center (সহায়ক শিক্ষা কেন্দ্র)
                      </option>
                      <option value="Health & Snake Awareness Camps">
                        Health & Snake Awareness Camps (স্বাস্থ্য ও সর্প সচেতনতা)
                      </option>
                      <option value="Renewable Energy & Eco-Workshops">
                        Renewable Energy & Eco-Workshops (পুনর্ব্যবহারযোগ্য শক্তি)
                      </option>
                      <option value="Event Organization & Nabanna Festival">
                        Event Organization & Nabanna Festival (নবান্ন উৎসব)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Full-time">Full-Time Field Stay</option>
                      <option value="Seasonal">Seasonal / Event-based</option>
                      <option value="Remote Digital Support">Remote / Digital Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Relevant Skills & Experience
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. Teaching, Farming, Organic Composting, Photography, Social Media"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Motivation / Why do you want to join Jiyonkathi?
                  </label>
                  <textarea
                    name="motivation"
                    rows={4}
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="আপনার অভিজ্ঞতা বা আগ্রহ সম্পর্কে জানান..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? "Submitting Application..." : "Submit Volunteer Application"}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
