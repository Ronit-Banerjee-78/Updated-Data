"use client";

import React, { useState, useEffect, useContext } from "react";
import { Settings, Users, Image, BookOpen, Briefcase, Info, Plus, Trash, Save, CheckCircle, Upload, Video, HandHelping, Check, X, Play, RefreshCw } from "lucide-react";
import { SiteContext } from '../context/SiteContext';

export default function AdminDashboard({ userSession, setUserSession }) {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [saved, setSaved] = useState(false);

  const { siteData, setSiteData: saveSiteData, loading } = useContext(SiteContext);
  const [data, setData] = useState(siteData);

  // Volunteers state
  const [volunteers, setVolunteers] = useState([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [volFilter, setVolFilter] = useState("all");

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
        } catch(e) {
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
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            vol.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
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
      case "members":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-stone-900">Members</h3>
              <button onClick={() => addArrayItem("members", { name: "", role: "", bio: "" })} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-emerald-200">
                <Plus className="w-4 h-4" /> <span>Add Member</span>
              </button>
            </div>
            {data.members.map(member => (
              <div key={member.id} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 relative group">
                <button onClick={() => deleteArrayItem("members", member.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-4 h-4" /></button>
                <div className="flex items-center space-x-4">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                      <Users className="w-6 h-6" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    <Upload className="w-4 h-4 inline-block mr-1" />
                    {member.image ? "Change Photo" : "Upload Photo"}
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "array", "members", member.id)} className="hidden" />
                  </label>
                </div>
                <input type="text" placeholder="Name" value={member.name} onChange={(e) => updateArrayItem("members", member.id, "name", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <input type="text" placeholder="Role" value={member.role} onChange={(e) => updateArrayItem("members", member.id, "role", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <textarea placeholder="Bio" rows={2} value={member.bio} onChange={(e) => updateArrayItem("members", member.id, "bio", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
              </div>
            ))}
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
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-stone-900">Blogs</h3>
              <button onClick={() => addArrayItem("blogs", { title: "", excerpt: "", author: "", date: "" })} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-emerald-200">
                <Plus className="w-4 h-4" /> <span>Add Blog Post</span>
              </button>
            </div>
            {data.blogs.map(blog => (
              <div key={blog.id} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 relative group">
                <button onClick={() => deleteArrayItem("blogs", blog.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-4 h-4" /></button>
                <input type="text" placeholder="Title" value={blog.title} onChange={(e) => updateArrayItem("blogs", blog.id, "title", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <textarea placeholder="Excerpt / Content" rows={2} value={blog.excerpt} onChange={(e) => updateArrayItem("blogs", blog.id, "excerpt", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <div className="flex gap-2">
                  <input type="text" placeholder="Author" value={blog.author} onChange={(e) => updateArrayItem("blogs", blog.id, "author", e.target.value)} className="w-1/2 border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                  <input type="text" placeholder="Date (e.g. Aug 2026)" value={blog.date} onChange={(e) => updateArrayItem("blogs", blog.id, "date", e.target.value)} className="w-1/2 border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        );
      case "work":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-stone-900">Our Work & Projects</h3>
              <button onClick={() => addArrayItem("work", { title: "", description: "" })} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-emerald-200">
                <Plus className="w-4 h-4" /> <span>Add Project</span>
              </button>
            </div>
            {data.work.map(project => (
              <div key={project.id} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 relative group">
                <button onClick={() => deleteArrayItem("work", project.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-4 h-4" /></button>
                <input type="text" placeholder="Title" value={project.title} onChange={(e) => updateArrayItem("work", project.id, "title", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
                <textarea placeholder="Description" rows={2} value={project.description} onChange={(e) => updateArrayItem("work", project.id, "description", e.target.value)} className="w-full border border-stone-200 rounded-lg p-2 text-sm focus:outline-emerald-500" />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: "volunteers", label: "Volunteers", icon: <HandHelping className="w-4 h-4" /> },
    { id: "videos", label: "Video Manager", icon: <Video className="w-4 h-4" /> },
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "about", label: "About Us", icon: <Info className="w-4 h-4" /> },
    { id: "members", label: "Members", icon: <Users className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery", icon: <Image className="w-4 h-4" /> },
    { id: "blogs", label: "Blogs", icon: <BookOpen className="w-4 h-4" /> },
    { id: "work", label: "Our Work", icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900">Admin Dashboard</h1>
            <p className="text-stone-500 mt-1">Manage website content, NGO videos, and volunteer submissions.</p>
          </div>
          <div className="flex gap-4 items-center">
            {saved && <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Saved successfully</span>}
            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-emerald-100">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button onClick={() => setUserSession(null)} className="bg-white border border-stone-200 text-stone-700 px-5 py-2.5 rounded-xl font-bold hover:bg-stone-100 transition-colors">
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-64 shrink-0 bg-white border border-stone-200 rounded-2xl p-2 flex md:flex-col gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors text-left shrink-0 md:shrink-auto ${
                  activeTab === tab.id ? "bg-emerald-50 text-emerald-700" : "text-stone-600 hover:bg-stone-50"
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

