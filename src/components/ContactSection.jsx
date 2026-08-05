"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, CheckCircle2, Send, Facebook } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "general", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-16 bg-white w-full">
      <section id="contact-content-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-500 mx-auto">
            Reach out to us to learn more about our sustainable practices, visit our farm, or collaborate for a better future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Jiyonkathi Location Satellite Map Card */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-900 group relative">
                <img
                  src="/images/jiyonkathi-map.jpg"
                  alt="Jiyonkathi Satellite Location Map - Pratappur, Aushgram"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="p-3 bg-stone-900/90 text-white flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-400">অবস্থান মানচিত্র (Plot 1942, Pratappur, Aushgram)</span>
                  <a href="https://maps.app.goo.gl/7eJagTKxeWjGfzHf8" target="_blank" rel="noreferrer" className="text-stone-300 hover:text-white underline text-[11px]">
                    Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-stone-200">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Farm Address</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    <strong>Jiyonkathi, (জিয়নকাঠি)</strong> <br />
                    Plot no. 1942 <br />
                    Village: Pratappur, P.O.- Pratappur <br />
                    PS: Aushgram, Dist: Barddhaman <br />
                    PIN: 71314
                  </p>
                  <a href="https://maps.app.goo.gl/7eJagTKxeWjGfzHf8" target="_blank" rel="noreferrer" className="text-emerald-600 text-xs font-bold hover:underline mt-2 inline-block">
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-stone-200">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Phone Number</h4>
                  <p className="text-xs text-stone-600 font-semibold leading-relaxed mt-1">
                    +91 94332 87654 / +91 98301 23456
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-stone-200">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Social Media</h4>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">
                    Follow our daily activities and updates on Facebook.
                  </p>
                  <a href="https://www.facebook.com/jiyonkaathi" target="_blank" rel="noreferrer" className="text-emerald-600 text-xs font-semibold hover:underline mt-2 inline-block">
                    Jiyonkathi Facebook Page &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-stone-200">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Email</h4>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">
                    contact@jiyonkathi.org
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600" />
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-stone-900">Message Received!</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. We will get back to you at <strong>{formData.email}</strong> as soon as possible.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-stone-900">Send a Message</h3>
                  <p className="text-xs text-stone-500">We&apos;d love to hear from you.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 block">Your Full Name</label>
                    <input type="text" required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 block">Email Address</label>
                    <input type="email" required name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 block">Message</label>
                    <textarea required name="message" rows={5} value={formData.message} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 resize-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
