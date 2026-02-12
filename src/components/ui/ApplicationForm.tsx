"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ApplicationForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const submitApplication = useMutation(api.applications.submit);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload your CV");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload CV to Vercel Blob via our API
            const uploadData = new FormData();
            uploadData.append("cv", file);

            const uploadRes = await fetch("/api/apply", {
                method: "POST",
                body: uploadData,
            });

            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url: cv_url } = await uploadRes.json();

            // 2. Submit to Convex
            await submitApplication({
                ...formData,
                cv_url
            });

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ name: "", email: "", phone: "", position: "", message: "" });
                setFile(null);
            }, 3000);

        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-12">
                            {isSuccess ? (
                                <div className="text-center py-12 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-8">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase">Application Received!</h3>
                                    <p className="text-gray-500 font-medium">Thank you for your interest. We will review your CV and get back to you soon.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase">Apply for a Position</h3>
                                    <p className="text-gray-500 mb-10 font-medium">Tell us more about yourself and upload your CV.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Full Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Email Address *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium"
                                                    placeholder="+212 ..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Desired Position *</label>
                                                <select
                                                    required
                                                    value={formData.position}
                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium appearance-none bg-white"
                                                >
                                                    <option value="">Select a position</option>
                                                    <option value="logistics">Logistics & Supply Chain</option>
                                                    <option value="quality">Quality Control</option>
                                                    <option value="sales">Sales & Export</option>
                                                    <option value="admin">Administrative</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Message</label>
                                            <textarea
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium resize-none"
                                                placeholder="Tell us why you want to join us..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Upload CV (PDF) *</label>
                                            <div className="relative">
                                                <label className={`flex items-center gap-4 cursor-pointer bg-gray-50 border-2 border-dashed ${file ? 'border-brand-green' : 'border-gray-200'} px-6 py-6 rounded-2xl hover:bg-gray-100 transition-all`}>
                                                    <div className={`p-3 rounded-xl ${file ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-200 text-gray-400'}`}>
                                                        <Upload className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="block font-bold text-gray-900">
                                                            {file ? file.name : "Choose a file or drag it here"}
                                                        </span>
                                                        <span className="text-xs text-gray-500 uppercase tracking-tighter">PDF only, max 5MB</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        required
                                                        className="hidden"
                                                        accept=".pdf"
                                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0A2A12] text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-orange transition-all shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    SUBMITTING...
                                                </>
                                            ) : (
                                                "SUBMIT APPLICATION"
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
