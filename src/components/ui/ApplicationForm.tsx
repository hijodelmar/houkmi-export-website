"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ReCAPTCHA from "react-google-recaptcha";

export default function ApplicationForm({ isOpen, onClose, lang, dict }: { isOpen: boolean, onClose: () => void, lang?: string, dict?: any }) {
    const submitApplication = useMutation(api.applications.submit);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: ""
    });

    // Helper for translations with fallbacks
    const t = (key: string, section: string = "ApplicationForm") => {
        return dict?.[section]?.[key] || key;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert(t("error_captcha"));
            return;
        }

        if (!file) {
            alert(t("error_file"));
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

            const uploadResult = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadResult.error || t("error_upload"));
            }

            const cv_url = uploadResult.url;

            // 2. Submit to Convex
            try {
                await submitApplication({
                    ...formData,
                    cv_url
                });
            } catch (convexError) {
                console.error("Convex error:", convexError);
                throw new Error(t("error_save"));
            }

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ name: "", email: "", phone: "", position: "", message: "" });
                setFile(null);
                setCaptchaToken(null);
                recaptchaRef.current?.reset();
            }, 3000);

        } catch (error) {
            console.error("Submission error:", error);
            alert(error instanceof Error ? error.message : t("error_save"));
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
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase">{t("success_title")}</h3>
                                    <p className="text-gray-500 font-medium">{t("success_desc")}</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase">{t("title")}</h3>
                                    <p className="text-gray-500 mb-10 font-medium">{t("subtitle")}</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("name")}</label>
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
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("email")}</label>
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
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("phone")}</label>
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
                                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("position")}</label>
                                                <select
                                                    required
                                                    value={formData.position}
                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium appearance-none bg-white"
                                                >
                                                    <option value="">{t("position_placeholder")}</option>
                                                    <option value="logistics">{t("pos_logistics")}</option>
                                                    <option value="quality">{t("pos_quality")}</option>
                                                    <option value="sales">{t("pos_sales")}</option>
                                                    <option value="admin">{t("pos_admin")}</option>
                                                    <option value="other">{t("pos_other")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("message")}</label>
                                            <textarea
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all font-medium resize-none"
                                                placeholder={t("message_placeholder")}
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">{t("upload_cv")}</label>
                                            <div className="relative">
                                                <label className={`flex items-center gap-4 cursor-pointer bg-gray-50 border-2 border-dashed ${file ? 'border-brand-green' : 'border-gray-200'} px-6 py-6 rounded-2xl hover:bg-gray-100 transition-all`}>
                                                    <div className={`p-3 rounded-xl ${file ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-200 text-gray-400'}`}>
                                                        <Upload className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="block font-bold text-gray-900">
                                                            {file ? file.name : t("upload_placeholder")}
                                                        </span>
                                                        <span className="text-xs text-gray-500 uppercase tracking-tighter">{t("upload_hint")}</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf"
                                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LdvEGgsAAAAAB1clNIRf_SQSjqHnqeiUBG6xmj5"}
                                                onChange={(token) => setCaptchaToken(token)}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0A2A12] text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-orange transition-all shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    {t("submitting")}
                                                </>
                                            ) : (
                                                t("submit")
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
