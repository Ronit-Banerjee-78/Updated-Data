"use client";

import React, { useState, useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import {
  ArrowRight,
  Calendar,
  User,
  X,
  Play,
  Video,
  Clock,
  MessageSquare,
  Share2,
  Send,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BLOGS, DEFAULT_VIDEOS } from "../data";

export default function BlogSection() {
  const { siteData, language } = useContext(SiteContext);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Fallback combine if siteData.blogs isn't available
  const allBlogs = (siteData && siteData.blogs && siteData.blogs.length > 0)
    ? siteData.blogs
    : [
        ...DEFAULT_VIDEOS.map((v) => ({
          id: `vid-${v.id}`,
          type: "video",
          title: v.title,
          excerpt: v.description,
          videoUrl: v.url,
          author: "জিয়নকাঠি প্রচার দল",
          date: v.date || "আগস্ট ২০২৬",
          category: "ভিডিও ডকুমেন্টারি",
          content: `${v.description}\n\nজিয়নকাঠির তেরো বছরের পথচলায় প্রকৃতিবান্ধব কৃষি, বীজ সংরক্ষণ, শিশুদের শিক্ষা ও গ্রামীণ স্বাবলম্বিতার ভিডিওচিত্র।`
        })),
        ...BLOGS.map((b) => ({ ...b, type: "article" }))
      ];

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedBlog) return;

    const blogId = selectedBlog.id;
    const currentList = comments[blogId] || [];
    const newEntry = {
      id: Date.now(),
      author: authorName.trim() || (language === "bn" ? "হিতৈষী পাঠক" : "Anonymous Reader"),
      text: newComment.trim(),
      date: language === "bn" ? "এখনই" : "Just now"
    };

    setComments({
      ...comments,
      [blogId]: [newEntry, ...currentList]
    });

    setNewComment("");
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  return (
    <div className="py-16 bg-stone-50/50 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100 inline-block">
            {language === "bn" ? "জিয়নকাঠি বার্তা ও ব্লগ" : "Jiyonkathi Blog & Stories"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
            {language === "bn"
              ? "প্রকৃতি, পরিবেশ ও গ্রামীণ জীবনের অভিজ্ঞতা"
              : "Stories of Sustainable Living & Rural Joy"}
          </h2>
          <p className="text-base text-stone-600 leading-relaxed font-medium">
            {language === "bn"
              ? "দেশীয় ধান ও বীজ সংরক্ষণ, বিষমুক্ত কৃষি, সহায়ক শিক্ষা কেন্দ্র ও প্রকৃতিবান্ধব জীবনযাপনের সচিত্র প্রতিবেদন।"
              : "Explore documented stories of indigenous seed conservation, organic farming, and community joy."}
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog, idx) => {
            const isVideo = blog.type === "video" || Boolean(blog.videoUrl);
            const activeCommentsCount = (blog.commentsCount || 0) + (comments[blog.id]?.length || 0);

            return (
              <motion.div
                key={blog.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer flex flex-col h-full group"
              >
                {/* Thumbnail / Video Banner */}
                <div className="relative h-52 bg-stone-900 overflow-hidden shrink-0">
                  {isVideo ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-stone-950">
                      <video
                        src={blog.videoUrl}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-transparent" />
                      <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                        <Play className="w-6 h-6 fill-white translate-x-0.5" />
                      </div>
                      <span className="absolute bottom-3 left-3 bg-stone-900/90 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-stone-700 flex items-center space-x-1">
                        <Video className="w-3 h-3" />
                        <span>{language === "bn" ? "ভিডিও ডকুমেন্টারি" : "Video Documentary"}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={blog.image || "/images/ecology-collage.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  )}

                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {blog.category || (language === "bn" ? "ব্লগ" : "Article")}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-xs font-semibold text-stone-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{blog.date}</span>
                      </span>
                      {blog.readTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{blog.readTime}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Footer Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-stone-600">
                      <div className="w-7 h-7 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs border border-emerald-100">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[120px]">{blog.author || "জিয়নকাঠি টিম"}</span>
                    </div>

                    <button className="text-emerald-700 font-bold text-xs flex items-center space-x-1 hover:space-x-2 transition-all">
                      <span>{language === "bn" ? "বিস্তারিত পড়ুন" : "Read Full Story"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL BLOG MODAL DIALOG */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Sticky Top Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between z-20">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    {selectedBlog.category || (language === "bn" ? "ব্লগ বিবরণ" : "Blog Details")}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {selectedBlog.date}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  {selectedBlog.title}
                </h2>

                {/* Author Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs text-stone-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-800 text-sm">{selectedBlog.author || "জিয়নকাঠি টিম"}</p>
                      <p className="text-[11px] text-stone-400">{selectedBlog.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg font-medium flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>
                        {(selectedBlog.commentsCount || 0) + (comments[selectedBlog.id]?.length || 0)}{" "}
                        {language === "bn" ? "মন্তব্য" : "comments"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Media Player / Image Display */}
                {selectedBlog.type === "video" || selectedBlog.videoUrl ? (
                  <div className="bg-black rounded-2xl overflow-hidden shadow-lg aspect-video relative">
                    <video
                      src={selectedBlog.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  selectedBlog.image && (
                    <div className="rounded-2xl overflow-hidden shadow-md max-h-96">
                      <img
                        src={selectedBlog.image}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )
                )}

                {/* Full Article Text */}
                <div className="prose prose-stone max-w-none space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">
                  {selectedBlog.content ? (
                    selectedBlog.content
                  ) : (
                    <>
                      <p>{selectedBlog.excerpt}</p>
                      <p>
                        জিয়নকাঠির তেরো বছরের কাজের মূল উদ্দেশ্য হলো প্রকৃতি ও মানুষের সম্পর্ককে আবার সুদৃঢ় ও ছন্দময় করা। বিষমুক্ত জৈব কৃষি, দেশীয় ধানের প্রজাতি সংরক্ষণ এবং ভবিষ্যতের জন্য সৌর শক্তি নির্ভর গ্রামীণ অবকাঠামো গড়ে তোলাই আমাদের অঙ্গীকার।
                      </p>
                      <p>
                        আমরা বিশ্বাস করি, কেবল বক্তৃতায় নয়, মাটিতে হাত রেখে কাজ করলেই আসল পরিবর্তন সম্ভব। প্রতিটি পদক্ষেপে গ্রামের কৃষক ও শিশুদের যুক্ত করে আমরা এক টেকসই সমাজ গড়ে তুলতে সচেষ্ট।
                      </p>
                    </>
                  )}
                </div>

                {/* Interactive Comments Section */}
                <div className="pt-8 border-t border-stone-200 space-y-6">
                  <h3 className="text-xl font-bold text-stone-900 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                    <span>{language === "bn" ? "পাঠকদের মতামত ও মন্তব্য" : "Comments & Reactions"}</span>
                  </h3>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={language === "bn" ? "আপনার নাম (ঐচ্ছিক)" : "Your Name (Optional)"}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                    <textarea
                      rows={3}
                      required
                      placeholder={language === "bn" ? "আপনার মন্তব্য বা মতামত এখানে লিখুন..." : "Write your thoughts or comment here..."}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />

                    <div className="flex items-center justify-between pt-1">
                      {commentSuccess && (
                        <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{language === "bn" ? "মন্তব্য পোস্ট করা হয়েছে!" : "Comment posted successfully!"}</span>
                        </span>
                      )}
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm ml-auto flex items-center space-x-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === "bn" ? "পোস্ট করুন" : "Post Comment"}</span>
                      </button>
                    </div>
                  </form>

                  {/* Comment List */}
                  <div className="space-y-3">
                    {(comments[selectedBlog.id] || []).length === 0 ? (
                      <p className="text-xs text-stone-400 italic">
                        {language === "bn" ? "এখনও কোনো নতুন মন্তব্য দেওয়া হয়নি। আপনার মতপ্রকাশ করুন!" : "No new comments yet. Be the first to share your thoughts!"}
                      </p>
                    ) : (
                      (comments[selectedBlog.id] || []).map((c) => (
                        <div key={c.id} className="bg-white p-4 rounded-xl border border-stone-150 space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                            <span>{c.author}</span>
                            <span className="text-[10px] text-stone-400 font-normal">{c.date}</span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">{c.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedBlog.title,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(language === "bn" ? "লিঙ্ক কপি করা হয়েছে!" : "Link copied to clipboard!");
                    }
                  }}
                  className="text-stone-600 hover:text-stone-900 font-semibold text-xs flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === "bn" ? "শেয়ার করুন" : "Share"}</span>
                </button>

                <button
                  onClick={() => setSelectedBlog(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  {language === "bn" ? "বন্ধ করুন" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
