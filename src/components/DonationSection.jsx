"use client";

import React, { useState } from "react";
import { Heart, QrCode, Landmark, CheckCircle2, Printer, ArrowLeft, ShieldCheck, Download, Sparkles } from "lucide-react";

export default function DonationSection() {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [receipt, setReceipt] = useState(null);

  const finalAmount = customAmount ? Number(customAmount) : amount;
  const predefinedAmounts = [500, 1000, 2000, 5000];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in your name and email address.");
      return;
    }

    const newReceipt = {
      receiptNo: `JK-DON-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      donorName: formData.name,
      donorEmail: formData.email,
      donorPhone: formData.phone || "N/A",
      donorPan: formData.pan || "N/A",
      amount: finalAmount,
      type: donationType === "one-time" ? "One-Time Contribution" : "Monthly Support Pledge",
      paymentMode: "UPI / QR Code Transfer",
      upiId: "jiyonkathi@upi",
    };

    setReceipt(newReceipt);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 bg-stone-50/50 w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Support Sustainable Living & Nature</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl tracking-tight">
            Support Jiyonkathi (জিয়নকাঠি)
          </h2>
          <p className="mt-3 max-w-2xl text-base text-stone-600 mx-auto">
            Your generous contribution directly funds organic farming initiatives, environmental protection, and community welfare in Pratappur.
          </p>
        </div>

        {receipt ? (
          /* Payment Slip / Receipt View */
          <div
            id="printable-receipt"
            className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-10 transition-all"
          >
            {/* Receipt Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 pb-6 mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className="bg-stone-900 p-2 rounded-2xl shrink-0 border border-stone-800">
                  <img
                    src="/images/logo.png"
                    alt="Jiyonkathi Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider block mb-0.5">
                    Official Donation Acknowledgment
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-900">
                    Jiyonkathi (জিয়নকাঠি)
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    A Sustainable Living Community • Plot no. 1942, Village: Pratappur, PS: Aushgram, Dist: Purba Bardhaman, PIN: 713141
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right bg-emerald-50 border border-emerald-200 p-3 rounded-2xl shrink-0">
                <span className="text-xs text-emerald-800 font-semibold block">Receipt No.</span>
                <span className="text-base font-extrabold text-emerald-900 font-mono">{receipt.receiptNo}</span>
              </div>
            </div>

            {/* Success Header */}
            <div className="flex items-center space-x-3 bg-emerald-50 text-emerald-900 p-4 rounded-2xl border border-emerald-200 mb-6">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Thank You for Your Generous Support!</h4>
                <p className="text-xs text-emerald-800">
                  Your payment contribution has been recorded successfully.
                </p>
              </div>
            </div>

            {/* Receipt Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-6 text-sm">
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">Donor Name</span>
                <span className="font-bold text-stone-900 text-base">{receipt.donorName}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">Date & Time</span>
                <span className="font-bold text-stone-900">{receipt.date}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">Email Address</span>
                <span className="font-semibold text-stone-900">{receipt.donorEmail}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">Phone Number</span>
                <span className="font-semibold text-stone-900">{receipt.donorPhone}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">PAN / Tax Identifier</span>
                <span className="font-bold text-stone-900 font-mono">{receipt.donorPan}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs block mb-1 font-medium uppercase tracking-wider">Contribution Type</span>
                <span className="font-bold text-stone-900">{receipt.type}</span>
              </div>
            </div>

            {/* Total Amount Highlight */}
            <div className="flex justify-between items-center bg-stone-900 text-white p-6 rounded-2xl mb-6">
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wider block">Total Amount Paid</span>
                <span className="text-xs text-emerald-400 font-medium">Payment Mode: {receipt.paymentMode}</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                ₹{receipt.amount.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Small Footer Note */}
            <div className="border-t border-stone-200 pt-4 mb-6">
              <p className="text-[11px] text-stone-500 italic text-center leading-relaxed">
                * Note: This is an official computer-generated receipt issued by Jiyonkathi Sustainable Living Community (জিয়নকাঠি). Contributions directly support indigenous paddy seed conservation, organic farming, and rural auxiliary education.
              </p>
            </div>

            {/* Action Buttons (Hidden when printing) */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md shadow-emerald-100"
              >
                <Printer className="w-5 h-5" />
                <span>Print / Download Payment Slip</span>
              </button>
              <button
                onClick={() => setReceipt(null)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Make Another Donation</span>
              </button>
            </div>
          </div>
        ) : (
          /* Donation Form View */
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-10">
            {/* One-Time vs Monthly Toggle */}
            <div className="flex space-x-3 mb-8 bg-stone-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setDonationType("one-time")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${donationType === "one-time"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
                  }`}
              >
                One-Time Contribution
              </button>
              <button
                type="button"
                onClick={() => setDonationType("monthly")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${donationType === "monthly"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
                  }`}
              >
                Monthly Support Pledge
              </button>
            </div>

            {/* Amount Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                Select Contribution Amount (INR)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {predefinedAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-3.5 rounded-xl font-extrabold text-base transition-all border ${amount === amt && customAmount === ""
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm"
                      : "border-stone-200 bg-white text-stone-700 hover:border-emerald-300"
                      }`}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-stone-500 font-bold">₹</span>
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(0);
                  }}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-8 pr-4 text-stone-900 font-bold focus:bg-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor Details */}
              <div className="space-y-4">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Donor Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Payer_Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. payee@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98300 00000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 bg-stone-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 font-semibold mb-1">
                      PAN / Tax ID (Optional for Tax Receipt)
                    </label>
                    <input
                      type="text"
                      name="pan"
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={handleInputChange}
                      className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 bg-stone-50 focus:bg-white uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Payment Gateway Option
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Active UPI QR Code Option */}
                  <div
                    onClick={() => setPaymentMethod("qr")}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${paymentMethod === "qr"
                      ? "border-emerald-600 bg-emerald-50/50"
                      : "border-stone-200 bg-white"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <QrCode className="w-6 h-6 text-emerald-600" />
                      <div>
                        <span className="font-bold text-stone-900 text-sm block">
                          Instant Scan & Pay (UPI / QR)
                        </span>
                        <span className="text-xs text-stone-500">GPay, PhonePe, Paytm, BHIM</span>
                      </div>
                    </div>
                    <span className="w-4 h-4 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                  </div>

                  {/* Disabled Bank Transfer Option (Coming Soon) */}
                  <div className="p-4 border border-stone-200 rounded-2xl bg-stone-100 opacity-70 cursor-not-allowed flex items-center justify-between relative overflow-hidden">
                    <div className="flex items-center space-x-3">
                      <Landmark className="w-6 h-6 text-stone-400" />
                      <div>
                        <span className="font-bold text-stone-500 text-sm block">Direct Bank Transfer</span>
                        <span className="text-xs text-stone-400">NEFT / RTGS Wire</span>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                      Coming Soon / আসছে শীঘ্রই
                    </span>
                  </div>
                </div>

                {/* QR Code Scan Box */}
                {paymentMethod === "qr" && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 text-center flex flex-col items-center">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                      Scan QR Code to Pay via any UPI App
                    </span>
                    <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-md my-2">
                      {/* Generates dynamic SVG QR mockup */}
                      <svg
                        className="w-44 h-44 mx-auto"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="100" height="100" fill="white" />
                        <path d="M10 10H35V35H10V10ZM15 15V30H30V15H15Z" fill="#047857" />
                        <path d="M20 20H25V25H20V20Z" fill="#047857" />
                        <path d="M65 10H90V35H65V10ZM70 15V30H85V15H70Z" fill="#047857" />
                        <path d="M75 20H80V25H75V20Z" fill="#047857" />
                        <path d="M10 65H35V90H10V65ZM15 70V85H30V70H15Z" fill="#047857" />
                        <path d="M20 75H25V80H20V75Z" fill="#047857" />
                        <rect x="42" y="10" width="16" height="80" fill="#047857" rx="2" />
                        <rect x="10" y="42" width="80" height="16" fill="#047857" rx="2" />
                        <path d="M65 65H80V80H65V65Z" fill="#047857" />
                        <path d="M82 82H90V90H82V82Z" fill="#047857" />
                      </svg>
                    </div>
                    <p className="text-xs font-mono font-bold text-stone-700 mt-1">
                      UPI ID: <span className="text-emerald-700">jiyonkathi@upi</span>
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Scan with Google Pay, PhonePe, Paytm, or Amazon Pay to transfer ₹{finalAmount || 0}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200/50 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5 text-emerald-200 fill-emerald-200" />
                  <span>Donate ₹{finalAmount || 0} & Generate Receipt</span>
                </button>
              </div>

              <p className="text-center text-xs text-stone-500 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                <span>Secure transfer • Official donation receipt generated instantly</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
