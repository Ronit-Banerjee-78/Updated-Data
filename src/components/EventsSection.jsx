"use client";

import React from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "\"Nabanna\" Harvest Festival",
      date: "Annually",
      time: "Full Day Event",
      location: "Jiyonkathi Farm",
      description: "Following the rhythm of village life, the 'Nabanna' festival is celebrated, where the story of the annual harvest blends with eating together, songs, poems, and dances.",
      type: "Cultural Event"
    },
    {
      id: 2,
      title: "Health Awareness Camp",
      date: "Seasonal",
      time: "10:00 AM - 4:00 PM",
      location: "Jiyonkathi Education Center",
      description: "Expert-conducted health awareness camps for the local farming community and children, promoting holistic well-being.",
      type: "Health"
    },
    {
      id: 3,
      title: "Snake Awareness Workshop",
      date: "Pre-Monsoon",
      time: "2:00 PM - 5:00 PM",
      location: "Pratappur Village Square",
      description: "An essential workshop to educate farmers and villagers about local snake species, preventing bites, and maintaining ecological balance.",
      type: "Education"
    }
  ];

  return (
    <div className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Community Events
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-500 mx-auto">
            Join us in our celebrations, workshops, and awareness camps as we build a sustainable community together.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event) => (
            <div key={event.id} className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
              <div className="md:w-1/4 shrink-0 bg-white p-4 rounded-xl border border-stone-100 text-center shadow-sm">
                <span className="block text-emerald-600 font-extrabold text-2xl">{event.date}</span>
                <span className="block text-stone-500 text-xs font-semibold uppercase mt-1">{event.type}</span>
              </div>
              
              <div className="flex-grow space-y-3">
                <h3 className="text-xl font-bold text-stone-900">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-stone-500">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
              
              <div className="md:w-1/5 shrink-0 flex justify-end">
                <button className="bg-white border border-stone-200 hover:border-emerald-500 text-stone-700 hover:text-emerald-600 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors w-full md:w-auto flex items-center justify-center space-x-2">
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
