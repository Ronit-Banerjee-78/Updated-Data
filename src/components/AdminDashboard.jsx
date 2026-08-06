"use client";

import React, { useState, useEffect, useContext } from "react";
import { Settings, Users, Image as ImageIcon, BookOpen, Briefcase, Info, Plus, Trash, Save, CheckCircle, Upload, Video, HandHelping, Check, X, Play, RefreshCw, Globe, Sparkles, FileText, Tag, Type, MapPin, Layers, Eye, Bell, Send, Megaphone, Award } from "lucide-react";
import { SiteContext } from '../context/SiteContext';

export default function AdminDashboard({ userSession, setUserSession }) {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [saved, setSaved] = useState(false);

  const { siteData, setSiteData: saveSiteData, loading } = useContext(SiteContext);
  const [data, setData] = useState(siteData);

  // System status state
  const [systemStatus, setSystemStatus] = useState(null);

  const fetchSystemStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      if (json.success) {
        setSystemStatus(json);
      }
    } catch (e) {
      console.error("Error fetching system status:", e);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
  }, []);
  const [volunteers, setVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [volFilter, setVolFilter] = useState("all");

  // Work notification state
  const [notifType, setNotifType] = useState("both");
  const [notifAudience, setNotifAudience] = useState("all");
  const [notifSubject, setNotifSubject] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifPriority, setNotifPriority] = useState("normal");

  const [prevSiteData, setPrevSiteData] = useState(siteData);
  if (siteData !== prevSiteData) {
    setPrevSiteData(siteData);
    setData(siteData);
  }

  const fetchVolunteers = async () => {
    setLoadingVolunteers(true);
    try {
      const res = await fetch('/api/volunteers');
      const result = await res.json();
      if (result.success) {
        setVolunteers(result.volunteers || []);
      }
    } catch (err) {
      console.error("Error loading volunteers:", err);
    } finally {
      setLoadingVolunteers(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (activeTab === "volunteers") {
      fetch('/api/volunteers')
        .then(res => res.json())
        .then(result => {
          if (active && result.success) {
            setVolunteers(result.volunteers || []);
          }
        })
        .catch(err => console.error("Error loading volunteers:", err));
    }
    return () => { active = false; };
  }, [activeTab]);

  const handleUpdateVolunteerStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (result.success) {
        setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      }
    } catch (err) {
      console.error("Error updating volunteer status:", err);
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (!confirm("Are you sure you want to delete this volunteer application?")) return;
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if (result.success) {
        setVolunteers(prev => prev.filter(v => v.id !== id));
      }
    } catch (err) {
      console.error("Error deleting volunteer:", err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-stone-600">Loading Admin Dashboard...</div>;

  const handleSave = async () => {
    await saveSiteData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, general: { ...prev.general, [name]: value } }));
  };

  const handleFileUpload = async (e, category, field, id = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        let errorMsg = `Upload failed (${res.status})`;
        try {
          const errRes = await res.json();
          errorMsg = errRes.error || errorMsg;
        } catch (e) {
          if (res.status === 413) errorMsg = "File is too large to upload.";
        }
        alert(errorMsg);
        return;
      }

      const result = await res.json();

      if (result.success) {
        if (category === "general") {
          setData(prev => ({ ...prev, general: { ...prev.general, [field]: result.url } }));
        } else if (category === "homepageVideo") {
          setData(prev => ({ ...prev, homepageVideo: { ...prev.homepageVideo, url: result.url } }));
        } else if (category === "array") {
          const itemKey = field === 'gallery' ? 'url' : 'image';
          updateArrayItem(field, id, itemKey, result.url);
        }
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Network error: Failed to upload file.");
    }
  };

  const handleAboutChange = (e) => {
    setData(prev => ({ ...prev, about: { ...prev.about, text: e.target.value } }));
  };

  const addArrayItem = (key, emptyItem) => {
    setData(prev => ({ ...prev, [key]: [...prev[key], { ...emptyItem, id: Date.now() }] }));
  };

  const updateArrayItem = (key, id, field, value) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteArrayItem = (key, id) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item.id !== id)
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "volunteers":
        const filteredVolunteers = volunteers.filter(v => {
          if (volFilter === "all") return true;
          return v.status === volFilter;
        });

        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-stone-900">Volunteer Submissions</h3>
                <p className="text-xs text-stone-500">View and manage form applications submitted by volunteers.</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={fetchVolunteers}
                  className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-bold transition-all"
                  title="Refresh List"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingVolunteers ? "animate-spin" : ""}`} />
                </button>
                <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600">
                  <button
                    onClick={() => setVolFilter("all")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${volFilter === "all" ? "bg-white text-stone-900 shadow-sm" : ""}`}
                  >
                    All ({volunteers.length})
                  </button>
                  <button
                    onClick={() => setVolFilter("pending")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${volFilter === "pending" ? "bg-white text-amber-700 shadow-sm" : ""}`}
                  >
                    Pending ({volunteers.filter(v => v.status === "pending").length})
                  </button>
                  <button
                    onClick={() => setVolFilter("approved")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${volFilter === "approved" ? "bg-white text-emerald-700 shadow-sm" : ""}`}
                  >
                    Approved ({volunteers.filter(v => v.status === "approved").length})
                  </button>
                </div>
              </div>
            </div>

            {loadingVolunteers ? (
              <div className="p-8 text-center text-sm font-semibold text-stone-500">
                Loading volunteer applications...
              </div>
            ) : filteredVolunteers.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                <HandHelping className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-stone-600">No volunteer submissions found</p>
                <p className="text-xs text-stone-400 mt-1">Applications submitted on the &quot;Become a Volunteer&quot; page will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVolunteers.map(vol => (
                  <div key={vol.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 relative">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-extrabold text-stone-900">{vol.name}</h4>
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${vol.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                              vol.status === 'rejected' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                                'bg-amber-100 text-amber-800 border-amber-200'
                            }`}>
                            {vol.status || 'pending'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{vol.email} • {vol.phone || 'No phone'} • {vol.location || 'Location not specified'}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        {vol.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateVolunteerStatus(vol.id, 'approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                            title="Approve Application"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {vol.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateVolunteerStatus(vol.id, 'rejected')}
                            className="bg-stone-200 hover:bg-stone-300 text-stone-700 p-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                            title="Reject Application"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteVolunteer(vol.id)}
                          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700">
                      <div>
                        <span className="font-bold text-stone-900 block mb-0.5">Program Selected:</span>
                        <span>{vol.program}</span>
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block mb-0.5">Availability:</span>
                        <span>{vol.availability}</span>
                      </div>
                      {vol.skills && (
                        <div className="md:col-span-2">
                          <span className="font-bold text-stone-900 block mb-0.5">Skills & Experience:</span>
                          <span>{vol.skills}</span>
                        </div>
                      )}
                      {vol.motivation && (
                        <div className="md:col-span-2">
                          <span className="font-bold text-stone-900 block mb-0.5">Motivation:</span>
                          <span className="italic text-stone-600">&quot;{vol.motivation}&quot;</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "videos":
        const videoData = data.homepageVideo || {
          title: "জিয়নকাঠি - আমাদের প্রকৃতিবান্ধব কার্যক্রম (NGO Works Video)",
          titleEnglish: "Jiyonkathi NGO Works & Sustainable Farming Documentary",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          autoplay: false,
          showInGallery: true,
          showInBlog: true,
          description: "জিয়নকাঠির তেরো বছরের কৃষি ও পরিবেশ রূপান্তরের ভিডিওচিত্র।"
        };

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-stone-900">Homepage NGO Works Video</h3>
              <p className="text-xs text-stone-500">Manage the featured NGO works video on the homepage, controls, and cross-section publishing.</p>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase">Video Title (Bengali / Primary)</label>
                <input
                  type="text"
                  value={videoData.title || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    homepageVideo: { ...prev.homepageVideo, title: e.target.value }
                  }))}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase">English Subtitle / Title</label>
                <input
                  type="text"
                  value={videoData.titleEnglish || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    homepageVideo: { ...prev.homepageVideo, titleEnglish: e.target.value }
                  }))}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase">Video URL or File Upload</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={videoData.url || ''}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      homepageVideo: { ...prev.homepageVideo, url: e.target.value }
                    }))}
                    placeholder="https://example.com/video.mp4"
                    className="flex-1 bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                  />
                  <label className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2 rounded-xl cursor-pointer flex items-center justify-center font-bold text-xs shrink-0">
                    <Upload className="w-4 h-4 mr-1.5" />
                    <span>Upload Video File</span>
                    <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "homepageVideo")} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase">Video Description</label>
                <textarea
                  rows={3}
                  value={videoData.description || ''}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    homepageVideo: { ...prev.homepageVideo, description: e.target.value }
                  }))}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <label className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(videoData.autoplay)}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      homepageVideo: { ...prev.homepageVideo, autoplay: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Autoplay on Homepage</span>
                    <span className="text-[10px] text-stone-500">Video starts automatically muted</span>
                  </div>
                </label>

                <label className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoData.showInGallery !== false}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      homepageVideo: { ...prev.homepageVideo, showInGallery: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Show in Gallery</span>
                    <span className="text-[10px] text-stone-500">Publish in Gallery media section</span>
                  </div>
                </label>

                <label className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoData.showInBlog !== false}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      homepageVideo: { ...prev.homepageVideo, showInBlog: e.target.checked }
                    }))}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Show in Blog</span>
                    <span className="text-[10px] text-stone-500">Publish as a video post in Blog</span>
                  </div>
                </label>
              </div>

            </div>
          </div>
        );

      case "general":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 mb-4">General Settings (Logo & Banner)</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Logo Text</label>
              <input type="text" name="logoText" value={data.general.logoText} onChange={handleGeneralChange} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:outline-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Logo Image URL or Upload</label>
              <div className="flex space-x-2">
                <input type="text" name="logoImage" value={data.general.logoImage || ''} placeholder="https://example.com/logo.png" onChange={handleGeneralChange} className="flex-1 border border-stone-200 rounded-lg p-3 text-sm focus:outline-emerald-500" />
                <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center border border-stone-200">
                  <span className="text-sm font-semibold">Upload</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "general", "logoImage")} className="hidden" />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Banner Heading (Bengali)</label>
              <textarea name="bannerHeadingBengali" rows={2} value={data.general.bannerHeadingBengali || data.general.bannerHeading} onChange={handleGeneralChange} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:outline-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">Banner Narrative Text</label>
              <textarea name="bannerText" rows={3} value={data.general.bannerText} onChange={handleGeneralChange} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:outline-emerald-500" />
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 mb-4">About Us Content</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase">About Intro Narrative</label>
              <textarea rows={6} value={data.about.text} onChange={handleAboutChange} className="w-full border border-stone-200 rounded-lg p-3 text-sm focus:outline-emerald-500" />
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Bell className="w-4 h-4 animate-bounce" />
                  <span>Member & Volunteer Dispatch Hub</span>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono">
                    COMING SOON
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Work Notification Broadcaster</h3>
                <p className="text-xs text-stone-300 mt-1 max-w-xl leading-relaxed">
                  Broadcast instant field alerts, work schedules, meeting notices, and event calls to all core members and volunteers via automated SMS and Email gateways.
                </p>
              </div>
              <div className="shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center relative z-10">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">Gateway Status</span>
                <span className="text-xs font-extrabold text-white flex items-center justify-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Integration Pending
                </span>
              </div>
            </div>

            {/* Coming Soon Alert Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Feature Marked as &quot;Coming Soon&quot;</p>
                <p className="text-amber-800 leading-relaxed">
                  This interface allows you to draft and configure work notifications. Full SMS (Twilio / Fast2SMS) and Email (SMTP / Nodemailer) API dispatching will be activated as soon as provider API keys are configured in your environment.
                </p>
              </div>
            </div>

            {/* Notification Composition Form */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-5">
              <h4 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center space-x-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Compose Work Notification</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">Notification Channel</label>
                  <select
                    value={notifType}
                    onChange={(e) => setNotifType(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold focus:outline-emerald-500"
                  >
                    <option value="both">🔔 Dual Broadcast (SMS + Email)</option>
                    <option value="sms">📲 SMS Alert Only</option>
                    <option value="email">📧 Email Notification Only</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">Target Audience</label>
                  <select
                    value={notifAudience}
                    onChange={(e) => setNotifAudience(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold focus:outline-emerald-500"
                  >
                    <option value="all">👥 All Executive Members & Volunteers ({((data.members || []).length) + ((data.volunteersList || []).length) + volunteers.length})</option>
                    <option value="executive">👔 Executive Leadership Members Only ({(data.members || []).length})</option>
                    <option value="volunteers">🤝 Approved Community Volunteers ({((data.volunteersList || []).length) + volunteers.filter(v => v.status === 'approved').length})</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">Work Subject / Campaign Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Field Call: Indigenous Paddy Seed Sowing Drive at Aushgram"
                    value={notifSubject}
                    onChange={(e) => setNotifSubject(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-medium focus:outline-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase">Priority Level</label>
                  <select
                    value={notifPriority}
                    onChange={(e) => setNotifPriority(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold focus:outline-emerald-500"
                  >
                    <option value="normal">🟢 Normal Work Schedule</option>
                    <option value="high">🟠 High Priority Field Call</option>
                    <option value="emergency">🔴 Emergency Alert</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase flex justify-between">
                  <span>Message Body</span>
                  <span className="text-stone-400 font-mono text-[10px]">{notifBody.length} chars</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Type work instructions, meeting details, location link, and required field equipment..."
                  value={notifBody}
                  onChange={(e) => setNotifBody(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-medium focus:outline-emerald-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200/80">
                <p className="text-[11px] text-stone-500 italic">
                  💡 Notification drafts will be queued and logged for SMS & Email dispatch.
                </p>
                <button
                  onClick={() => {
                    alert("🚧 Feature Coming Soon!\n\nWork Notification Broadcaster is marked as 'Coming Soon'. Automated SMS & Email dispatching will be enabled once SMS/Email gateway credentials are added.");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-200 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Work Broadcast (Coming Soon)</span>
                </button>
              </div>
            </div>

            {/* Scheduled / Recent Broadcast Logs Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-stone-700 uppercase tracking-wider">
                Recent Broadcast Logs & Queued Alerts
              </h4>
              <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden text-xs">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">Auxiliary Education Center Volunteer Meetup</span>
                    <span className="text-stone-500 text-[11px]">Target: 18 Volunteers • Channel: Dual (SMS + Email)</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                    COMING SOON
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">Native Seed Collection & Preservation Workshop</span>
                    <span className="text-stone-500 text-[11px]">Target: All Executive Members • Channel: Email</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                    COMING SOON
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "members":
        return (
          <div className="space-y-8">
            {/* Executive Members Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">Executive Members</h3>
                  <p className="text-xs text-stone-500">Manage executive leadership members rendered at the top of the Members page.</p>
                </div>
                <button
                  onClick={() => addArrayItem("members", { name: "", role: "", bio: "", image: "" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> <span>Add Executive Member</span>
                </button>
              </div>

              {(!data.members || data.members.length === 0) ? (
                <p className="text-xs text-stone-400 italic p-4">No executive members found. Click &quot;Add Executive Member&quot; to create one.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {data.members.map((member) => (
                    <div key={member.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 relative group">
                      <button
                        onClick={() => deleteArrayItem("members", member.id)}
                        className="absolute top-4 right-4 text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition-colors"
                        title="Delete Member"
                      >
                        <Trash className="w-4 h-4" />
                      </button>

                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-200 flex items-center justify-center border border-stone-300 shrink-0">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-6 h-6 text-stone-400" />
                          )}
                        </div>
                        <label className="cursor-pointer bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                          <Upload className="w-3.5 h-3.5 inline-block mr-1" />
                          {member.image ? "Change Photo" : "Upload Member Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "array", "members", member.id)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Member Name (e.g. Raju Mandal)"
                          value={member.name || ''}
                          onChange={(e) => updateArrayItem("members", member.id, "name", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold focus:outline-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="Role / Title (e.g. Lead Farmer & Seed Conservator)"
                          value={member.role || ''}
                          onChange={(e) => updateArrayItem("members", member.id, "role", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-medium focus:outline-emerald-500"
                        />
                      </div>
                      <textarea
                        placeholder="Short Biography / Mission Statement..."
                        rows={2}
                        value={member.bio || ''}
                        onChange={(e) => updateArrayItem("members", member.id, "bio", e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-medium focus:outline-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Community Volunteers Section */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">Community Volunteers</h3>
                  <p className="text-xs text-stone-500">Manage field coordinators and volunteers displayed in the Grassroots Impact Network section.</p>
                </div>
                <button
                  onClick={() => addArrayItem("volunteersList", { name: "", designation: "", location: "Purba Bardhaman, WB", bio: "", image: "" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> <span>Add Volunteer</span>
                </button>
              </div>

              {(!data.volunteersList || data.volunteersList.length === 0) ? (
                <p className="text-xs text-stone-400 italic p-4">No community volunteers added yet. Click &quot;Add Volunteer&quot; to create one.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {data.volunteersList.map((vol) => (
                    <div key={vol.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 relative group">
                      <button
                        onClick={() => deleteArrayItem("volunteersList", vol.id)}
                        className="absolute top-4 right-4 text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition-colors"
                        title="Delete Volunteer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>

                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-stone-200 flex items-center justify-center border border-stone-300 shrink-0">
                          {vol.image ? (
                            <img src={vol.image} alt={vol.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-6 h-6 text-stone-400" />
                          )}
                        </div>
                        <label className="cursor-pointer bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                          <Upload className="w-3.5 h-3.5 inline-block mr-1" />
                          {vol.image ? "Change Photo" : "Upload Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "array", "volunteersList", vol.id)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Volunteer Name"
                          value={vol.name || ''}
                          onChange={(e) => updateArrayItem("volunteersList", vol.id, "name", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold focus:outline-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="Designation / Field Role"
                          value={vol.designation || vol.role || ''}
                          onChange={(e) => updateArrayItem("volunteersList", vol.id, "designation", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-medium focus:outline-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Burdwan, WB)"
                          value={vol.location || ''}
                          onChange={(e) => updateArrayItem("volunteersList", vol.id, "location", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-medium focus:outline-emerald-500"
                        />
                      </div>
                      <textarea
                        placeholder="Bio / Work Area..."
                        rows={2}
                        value={vol.bio || ''}
                        onChange={(e) => updateArrayItem("volunteersList", vol.id, "bio", e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-medium focus:outline-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-stone-900">Gallery Media</h3>
              <button onClick={() => addArrayItem("gallery", { title: "", type: "Photo", url: "", category: "events" })} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-emerald-200">
                <Plus className="w-4 h-4" /> <span>Add Media</span>
              </button>
            </div>
            {data.gallery.map(media => (
              <div key={media.id} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 relative group">
                <button onClick={() => deleteArrayItem("gallery", media.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-4 h-4" /></button>
                <input type="text" placeholder="Title" value={media.title} onChange={(e) => updateArrayItem("gallery", media.id, "title", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <div className="flex gap-2">
                  <select value={media.type} onChange={(e) => updateArrayItem("gallery", media.id, "type", e.target.value)} className="w-1/2 border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500">
                    <option value="Photo">Photo</option>
                    <option value="Video">Video</option>
                  </select>
                  <select value={media.category || 'events'} onChange={(e) => updateArrayItem("gallery", media.id, "category", e.target.value)} className="w-1/2 border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500">
                    <option value="events">Events</option>
                    <option value="campaigns">Campaigns</option>
                    <option value="impact">Impact</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Media URL (Image or Video Link)" value={media.url || ''} onChange={(e) => updateArrayItem("gallery", media.id, "url", e.target.value)} className="flex-1 border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                  <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center border border-stone-200">
                    <span className="text-sm font-semibold">Upload</span>
                    <input type="file" accept={media.type === 'Video' ? "video/*" : "image/*"} onChange={(e) => handleFileUpload(e, "array", "gallery", media.id)} className="hidden" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        );
      case "blogs":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-900 to-stone-900 p-5 rounded-2xl text-white">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Dynamic Storyteller Studio</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">Blog & Article Writer</h3>
                <p className="text-xs text-stone-300 mt-0.5">Write stories in Bengali & English, upload custom images to Cloudinary, and publish instantly.</p>
              </div>
              <button
                onClick={() => addArrayItem("blogs", {
                  title: "",
                  titleEnglish: "",
                  category: "জৈব কৃষি / Organic Agriculture",
                  excerpt: "",
                  excerptEnglish: "",
                  content: "",
                  contentEnglish: "",
                  author: "জিয়নকাঠি টিম",
                  date: "আগস্ট ২০২৬",
                  image: "",
                  videoUrl: ""
                })}
                className="bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Blog Post</span>
              </button>
            </div>

            {data.blogs.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-stone-600">No blog posts found</p>
                <p className="text-xs text-stone-400 mt-1">Click &quot;Create New Blog Post&quot; above to start writing.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {data.blogs.map((blog, idx) => (
                  <div key={blog.id || idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4 relative group shadow-sm hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-center border-b border-stone-200/80 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-stone-200 text-stone-800 text-[10px] font-bold px-2.5 py-1 rounded-md font-mono">
                          POST #{idx + 1}
                        </span>
                        <span className="text-xs font-extrabold text-stone-700">
                          {blog.title || blog.titleEnglish || "Untitled Blog Post"}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteArrayItem("blogs", blog.id)}
                        className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors flex items-center space-x-1 text-xs font-bold"
                        title="Delete Blog Post"
                      >
                        <Trash className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Category Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase flex items-center space-x-1">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Category / Topic Tag</span>
                        </label>
                        <select
                          value={blog.category || "জৈব কৃষি / Organic Agriculture"}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "category", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold focus:outline-emerald-500"
                        >
                          <option value="জৈব কৃষি / Organic Agriculture">জৈব কৃষি (Organic Agriculture)</option>
                          <option value="বীজ সংরক্ষণ / Native Seed Preservation">বীজ সংরক্ষণ (Native Seed Preservation)</option>
                          <option value="সহায়ক শিক্ষা / Auxiliary Education">সহায়ক শিক্ষা (Auxiliary Education)</option>
                          <option value="পরিবেশ সুরক্ষা / Ecology & Environment">পরিবেশ সুরক্ষা (Ecology & Environment)</option>
                          <option value="সর্প সচেতনতা / Snake Awareness & Health">সর্প সচেতনতা (Snake Awareness & Health)</option>
                          <option value="সংস্থা বার্তা / NGO Announcements">সংস্থা বার্তা (NGO Announcements)</option>
                          <option value="ভিডিও তথ্যচিত্র / Video Documentary">ভিডিও তথ্যচিত্র (Video Documentary)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-stone-600 uppercase">Author Name</label>
                          <input
                            type="text"
                            placeholder="e.g. জিয়নকাঠি টিম"
                            value={blog.author || ''}
                            onChange={(e) => updateArrayItem("blogs", blog.id, "author", e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-medium"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-stone-600 uppercase">Publish Date</label>
                          <input
                            type="text"
                            placeholder="e.g. আগস্ট ২০২৬"
                            value={blog.date || ''}
                            onChange={(e) => updateArrayItem("blogs", blog.id, "date", e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dual Language Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 uppercase flex items-center space-x-1">
                          <Globe className="w-3.5 h-3.5 text-amber-600" />
                          <span>Bengali Title (বাংলা শিরোনাম)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="বাংলা শিরোনাম লিখুন..."
                          value={blog.title || ''}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "title", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 uppercase flex items-center space-x-1">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>English Title</span>
                        </label>
                        <input
                          type="text"
                          placeholder="English title..."
                          value={blog.titleEnglish || ''}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "titleEnglish", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm focus:outline-emerald-500 font-bold"
                        />
                      </div>
                    </div>

                    {/* Featured Image Cloudinary Uploader */}
                    <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                      <label className="text-[11px] font-bold text-stone-700 uppercase flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <ImageIcon className="w-4 h-4 text-emerald-600" />
                          <span>Blog Featured Image (Cloudinary Direct Upload)</span>
                        </span>
                        <span className="text-[10px] text-stone-400 font-normal">No static image will be attached if left empty</span>
                      </label>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <input
                          type="text"
                          placeholder="Image URL or click Upload to select image file"
                          value={blog.image || ''}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "image", e.target.value)}
                          className="flex-1 w-full border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-mono"
                        />
                        <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center font-bold text-xs shrink-0 transition-all shadow-sm">
                          <Upload className="w-4 h-4 mr-1.5" />
                          <span>Upload Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "array", "blogs", blog.id)}
                            className="hidden"
                          />
                        </label>
                        {blog.image && (
                          <button
                            onClick={() => updateArrayItem("blogs", blog.id, "image", "")}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {blog.image && (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 mt-2">
                          <img src={blog.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute bottom-2 right-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Live Image Preview
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Optional Video Link */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase flex items-center space-x-1">
                        <Video className="w-3.5 h-3.5 text-purple-600" />
                        <span>Optional Video URL (Documentary / MP4 / Link)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/video.mp4"
                        value={blog.videoUrl || ''}
                        onChange={(e) => updateArrayItem("blogs", blog.id, "videoUrl", e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-mono"
                      />
                    </div>

                    {/* Excerpt / Short Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">Bengali Short Summary (সংক্ষিপ্ত বিবরণ)</label>
                        <textarea
                          rows={2}
                          placeholder="ব্লগটির সংক্ষিপ্ত সারসংক্ষেপ..."
                          value={blog.excerpt || ''}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "excerpt", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs focus:outline-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">English Short Summary</label>
                        <textarea
                          rows={2}
                          placeholder="Short summary in English..."
                          value={blog.excerptEnglish || ''}
                          onChange={(e) => updateArrayItem("blogs", blog.id, "excerptEnglish", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs focus:outline-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Full Article Content */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-extrabold text-stone-800 uppercase flex items-center space-x-1">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>Full Article Body Content (সম্পূর্ণ নিবন্ধের বিস্তারিত)</span>
                        </label>
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => updateArrayItem("blogs", blog.id, "content", (blog.content || "") + "\n### ")}
                            className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold"
                            title="Add Heading"
                          >
                            + Heading
                          </button>
                          <button
                            type="button"
                            onClick={() => updateArrayItem("blogs", blog.id, "content", (blog.content || "") + "\n- ")}
                            className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold"
                            title="Add Bullet Point"
                          >
                            + Bullet
                          </button>
                          <button
                            type="button"
                            onClick={() => updateArrayItem("blogs", blog.id, "content", (blog.content || "") + "\n> ")}
                            className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold"
                            title="Add Quote"
                          >
                            + Quote
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-700 block">Bengali Body Content</span>
                          <textarea
                            rows={6}
                            placeholder="এখানে ব্লগের বিস্তারিত বাংলা অনুচ্ছেদ লিখুন..."
                            value={blog.content || ''}
                            onChange={(e) => updateArrayItem("blogs", blog.id, "content", e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs leading-relaxed focus:outline-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-blue-700 block">English Body Content</span>
                          <textarea
                            rows={6}
                            placeholder="Write full article content in English..."
                            value={blog.contentEnglish || ''}
                            onChange={(e) => updateArrayItem("blogs", blog.id, "contentEnglish", e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs leading-relaxed focus:outline-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "work":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-stone-900 p-5 rounded-2xl text-white">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Dynamic NGO Projects Manager</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">Our Work & Initiatives</h3>
                <p className="text-xs text-stone-300 mt-0.5">Manage featured NGO field projects with Cloudinary photos and location details.</p>
              </div>
              <button
                onClick={() => addArrayItem("work", {
                  title: "",
                  titleEnglish: "",
                  category: "জৈব কৃষি / Organic Agriculture",
                  location: "Pratappur, Aushgram, WB",
                  impact: "300+ Farmers",
                  description: "",
                  descriptionEnglish: "",
                  image: ""
                })}
                className="bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New NGO Work</span>
              </button>
            </div>

            {data.work.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                <Briefcase className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-stone-600">No project items added</p>
                <p className="text-xs text-stone-400 mt-1">Click &quot;Add New NGO Work&quot; to showcase field initiatives.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {data.work.map((project, idx) => (
                  <div key={project.id || idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4 relative group shadow-sm hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-center border-b border-stone-200/80 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md font-mono">
                          PROJECT #{idx + 1}
                        </span>
                        <span className="text-xs font-extrabold text-stone-800">
                          {project.title || project.titleEnglish || "Untitled Initiative"}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteArrayItem("work", project.id)}
                        className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors flex items-center space-x-1 text-xs font-bold"
                        title="Delete Project"
                      >
                        <Trash className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">Sector / Category</label>
                        <select
                          value={project.category || "জৈব কৃষি / Organic Agriculture"}
                          onChange={(e) => updateArrayItem("work", project.id, "category", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold focus:outline-emerald-500"
                        >
                          <option value="জৈব কৃষি (Organic Agriculture)">জৈব কৃষি (Organic Agriculture)</option>
                          <option value="বীজ সংরক্ষণ (Native Seed Bank)">বীজ সংরক্ষণ (Native Seed Bank)</option>
                          <option value="সহায়ক শিক্ষা (Auxiliary Education)">সহায়ক শিক্ষা (Auxiliary Education)</option>
                          <option value="সর্প সচেতনতা (Snake Awareness)">সর্প সচেতনতা (Snake Awareness)</option>
                          <option value="স্বাস্থ্য শিবির (Community Health)">স্বাস্থ্য শিবির (Community Health)</option>
                          <option value="পরিবেশবান্ধব কারুশিল্প (Handicrafts)">পরিবেশবান্ধব কারুশিল্প (Handicrafts)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">Location / Area</label>
                        <input
                          type="text"
                          placeholder="e.g. Pratappur, Aushgram, WB"
                          value={project.location || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "location", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">Impact Metric</label>
                        <input
                          type="text"
                          placeholder="e.g. 500+ Farmers benefited"
                          value={project.impact || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "impact", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    {/* Dual Language Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 uppercase">Bengali Title</label>
                        <input
                          type="text"
                          placeholder="প্রকল্পের নাম (বাংলা)..."
                          value={project.title || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "title", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 uppercase">English Title</label>
                        <input
                          type="text"
                          placeholder="Project name in English..."
                          value={project.titleEnglish || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "titleEnglish", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-bold"
                        />
                      </div>
                    </div>

                    {/* Project Photo Cloudinary Upload */}
                    <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                      <label className="text-[11px] font-bold text-stone-700 uppercase flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <ImageIcon className="w-4 h-4 text-emerald-600" />
                          <span>Project Field Photo (Cloudinary Upload)</span>
                        </span>
                        <span className="text-[10px] text-stone-400 font-normal">Dynamic photo upload</span>
                      </label>

                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <input
                          type="text"
                          placeholder="Photo URL or click Upload"
                          value={project.image || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "image", e.target.value)}
                          className="flex-1 w-full border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-emerald-500 font-mono"
                        />
                        <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center font-bold text-xs shrink-0 transition-all shadow-sm">
                          <Upload className="w-4 h-4 mr-1.5" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "array", "work", project.id)}
                            className="hidden"
                          />
                        </label>
                        {project.image && (
                          <button
                            onClick={() => updateArrayItem("work", project.id, "image", "")}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {project.image && (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 mt-2">
                          <img src={project.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">Bengali Description</label>
                        <textarea
                          rows={3}
                          placeholder="প্রকল্পের বিস্তারিত বিবরণ..."
                          value={project.description || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "description", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs focus:outline-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-600 uppercase">English Description</label>
                        <textarea
                          rows={3}
                          placeholder="Detailed description in English..."
                          value={project.descriptionEnglish || ''}
                          onChange={(e) => updateArrayItem("work", project.id, "descriptionEnglish", e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs focus:outline-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: "volunteers", label: "Volunteers", icon: <HandHelping className="w-4 h-4" /> },
    { id: "notifications", label: "Work Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "videos", label: "Video Manager", icon: <Video className="w-4 h-4" /> },
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "about", label: "About Us", icon: <Info className="w-4 h-4" /> },
    { id: "members", label: "Members", icon: <Users className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "blogs", label: "Blogs", icon: <BookOpen className="w-4 h-4" /> },
    { id: "work", label: "Our Work", icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900">Admin Dashboard</h1>
            <p className="text-stone-500 mt-1">Manage website content, NGO videos, and volunteer submissions.</p>
          </div>
          <div className="flex gap-4 items-center">
            {saved && <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved successfully</span>}
            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-emerald-100">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button onClick={() => setUserSession(null)} className="bg-white border border-stone-200 text-stone-700 px-5 py-2.5 rounded-xl font-bold hover:bg-stone-100 transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* System Diagnostics & Storage Banner */}
        {systemStatus && (
          <div className="bg-stone-900 text-white p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-stone-800 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${systemStatus.dbConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Database & Cloud Storage Engine</span>
                  <button onClick={fetchSystemStatus} className="text-stone-400 hover:text-white transition-colors" title="Refresh Connection Status">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${systemStatus.dbConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                    PostgreSQL: {systemStatus.dbConnected ? 'Connected (Active)' : 'Disconnected (Using In-Memory Fallback)'}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${systemStatus.cloudinaryConfigured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-stone-800 text-stone-400 border border-stone-700'}`}>
                    Cloudinary: {systemStatus.cloudinaryConfigured ? 'Cloud Configured (CDN Ready)' : 'Missing Env Keys (Local Fallback)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-stone-400 font-mono shrink-0">
              <p>Active Settings Storage: <span className="text-white font-bold">{systemStatus.activeSettingsStorage}</span></p>
              <p>Active Media Uploads: <span className="text-white font-bold">{systemStatus.activeMediaStorage}</span></p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-64 shrink-0 bg-white border border-stone-200 rounded-2xl p-2 flex md:flex-col gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors text-left shrink-0 md:shrink-auto ${activeTab === tab.id ? "bg-emerald-50 text-emerald-700" : "text-stone-600 hover:bg-stone-50"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-grow bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

