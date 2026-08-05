"use client";

import AdminDashboard from "./AdminDashboard";
import React, { useState } from "react";
import {
  User,
  Lock,
  LogOut,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Sparkles,
  Search,
  MessageSquare,
  FileText,
  Sliders,
  Heart,
  Send,
} from "lucide-react";
import { WELFARE_PROJECTS } from "../data";

export default function PortalSection({ userSession, setUserSession }) {
  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Local Storage or State for Admin Data
  const [volunteerApps, setVolunteerApps] = useState([
    {
      id: "1",
      name: "Alice Watson",
      email: "alice.w@gmail.com",
      program: "Pediatric Medical Mobile Unit",
      status: "pending",
    },
    {
      id: "2",
      name: "Marcus Brody",
      email: "marcus.b@outlook.com",
      program: "Scholastic Book Packing",
      status: "pending",
    },
    {
      id: "3",
      name: "Sophia Chen",
      email: "sophia.c@stanford.edu",
      program: "Solar Community Hub Installation",
      status: "pending",
    },
  ]);

  const [patronMessages, setPatronMessages] = useState([
    {
      id: "1",
      name: "David Vance",
      message:
        "Is there a specific collection drive for children textbooks in Washington?",
      date: "July 16, 2026",
      status: "unread",
    },
    {
      id: "2",
      name: "Elena Rostova",
      message:
        "I loved the zero-waste transparency report. My workplace wants to match our donations!",
      date: "July 15, 2026",
      status: "replied",
      replyText:
        "Hi Elena, thank you so much! We have sent a corporate match proposal kit to your email.",
    },
  ]);

  const [myPledges, setMyPledges] = useState([
    {
      id: "1",
      title: "Midday School Meals",
      amount: 15,
      date: "Monthly Pledged",
    },
    {
      id: "2",
      title: "Bright Minds Literacy Kit",
      amount: 30,
      date: "Monthly Pledged",
    },
  ]);

  // Patron feedback form
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Admin dynamic target updates
  const [campaignTargets, setCampaignTargets] = useState(() => {
    return WELFARE_PROJECTS.map((p) => ({
      id: p.id,
      title: p.title,
      target: p.targetAmount,
      raised: p.raisedAmount,
    }));
  });

  const [activeAdminTab, setActiveAdminTab] = useState("metrics");
  const [searchTxn, setSearchTxn] = useState("");
  const [downloadingCert, setDownloadingCert] = useState(null);

  // Mock past transactions for the logged in Patron
  const mockTransactions = [
    {
      id: "TXN-9481283",
      date: "July 12, 2026",
      amount: 30,
      fund: "Bright Minds Fund",
      status: "Settled",
    },
    {
      id: "TXN-9428105",
      date: "June 12, 2026",
      amount: 30,
      fund: "Bright Minds Fund",
      status: "Settled",
    },
    {
      id: "TXN-9388410",
      date: "May 15, 2026",
      amount: 50,
      fund: "Mobile Health Clinic Fund",
      status: "Settled",
    },
    {
      id: "TXN-9201938",
      date: "Jan 05, 2026",
      amount: 100,
      fund: "Clean Water Fund",
      status: "Settled",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (email === "admin@jiyonkathi.org" && password === "admin123") {
      setUserSession({
        role: "admin",
        name: "Staff Administrator",
        email: "admin@jiyonkathi.org",
      });
      setSuccessMsg("Administrative access granted!");
    } else {
      setError(
        "Invalid administrator credentials. Use admin@jiyonkathi.org / admin123 to preview.",
      );
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    setEmail("");
    setPassword("");
    setError("");
    setSuccessMsg("");
  };

  const triggerDownload = (id) => {
    setDownloadingCert(id);
    setTimeout(() => {
      setDownloadingCert(null);
      alert(
        `Simulated IRS 501(c)(3) tax receipt certificate for ${id} has been downloaded successfully to your local machine.`,
      );
    }, 1500);
  };

  const submitPatronFeedback = (e) => {
    e.preventDefault();
    if (feedbackMsg.trim()) {
      const newMsg = {
        id: String(Date.now()),
        name: userSession?.name || "Anonymous Patron",
        message: feedbackMsg,
        date: "Today",
        status: "unread",
      };
      setPatronMessages((prev) => [newMsg, ...prev]);
      setFeedbackSent(true);
      setFeedbackMsg("");
      setTimeout(() => setFeedbackSent(false), 4000);
    }
  };

  const approveVolunteer = (id) => {
    setVolunteerApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "approved" } : app)),
    );
  };

  const rejectVolunteer = (id) => {
    setVolunteerApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected" } : app)),
    );
  };

  const updateCampaignTarget = (id, newAmt) => {
    if (!isNaN(newAmt) && newAmt > 0) {
      setCampaignTargets((prev) =>
        prev.map((cam) => (cam.id === id ? { ...cam, target: newAmt } : cam)),
      );
    }
  };

  const handleReplyMessage = (id, replyText) => {
    setPatronMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "replied", replyText } : msg,
      ),
    );
  };

  const filteredTxns = mockTransactions.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTxn.toLowerCase()) ||
      t.fund.toLowerCase().includes(searchTxn.toLowerCase()),
  );

  return (
    <div id="portal-section" className="space-y-16 pb-24">
      {/* Header */}
      <section
        id="portal-header"
        className="bg-stone-50 border-b border-stone-200 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
            Secure Gateway
          </span>
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
            {userSession
              ? "Operations Staff"
              : "Jiyonkathi Admin Portal"}
          </h1>
          <p className="text-base text-stone-500 max-w-2xl mx-auto">
            {userSession
              ? `Logged in as ${userSession.name} (${userSession.email}). Accessing authenticated non-profit records.`
              : "Sign in to manage operational campaigns, volunteers, and community events."}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!userSession ? (
          /* LOGIN SCREEN */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12">
            {/* Quick credentials Helper Bar */}
            <div className="md:col-span-5 bg-stone-950 p-8 sm:p-12 text-white flex flex-col justify-between space-y-8 relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="inline-flex bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    Interactive Demonstration
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    We have configured a persistent mock account to help you
                    test the authenticated experience. Use the details below.
                  </p>
                </div>

                {/* Pre-filled Account info cards */}
                <div className="space-y-4 pt-2">
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1.5">
                    <span className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wider block">
                      Staff Admin Account
                    </span>
                    <div className="text-xs space-y-0.5 font-mono text-stone-300">
                      <div>
                        Email:{" "}
                        <span className="text-white font-bold select-all">
                          admin@jiyonkathi.org
                        </span>
                      </div>
                      <div>
                        Pass:{" "}
                        <span className="text-white font-bold select-all">
                          admin123
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-stone-500 border-t border-stone-900 pt-4 leading-relaxed">
                ✓ SSL encryption simulated. Session variables are retained in
                active component scopes.
              </div>
            </div>

            {/* Login Form Column */}
            <div className="md:col-span-7 p-8 sm:p-12 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Sign In to Jiyonkathi
                </h2>
                <p className="text-xs text-stone-500">
                  Choose your system partition to access your profile.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-500 block">
                    E-mail Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@jiyonkathi.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-stone-500 block">
                      Security Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("admin@jiyonkathi.org");
                        setPassword("admin123");
                        setError("");
                      }}
                      className="text-[10px] font-bold text-emerald-600 hover:underline"
                    >
                      Autofill Demo Password
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <AdminDashboard userSession={userSession} setUserSession={setUserSession} />
        )}
      </section>
    </div>
  );
}
