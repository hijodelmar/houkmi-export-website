"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X, Upload, CheckCircle } from "lucide-react";
import ReviewSchema from "@/components/seo/ReviewSchema";
import ReCAPTCHA from "react-google-recaptcha";

interface Review {
    id: string;
    name: string;
    company: string;
    country: string;
    rating: number;
    comment: string;
    image_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export default function Reviews({ lang, dict }: { lang: string; dict: any }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        country: "",
        rating: 5,
        comment: "",
        image_url: ""
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please verify that you are not a robot.");
            return;
        }

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, captcha: captchaToken })
            });

            if (res.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsFormOpen(false);
                    setIsSubmitted(false);
                    setFormData({ name: "", company: "", country: "", rating: 5, comment: "", image_url: "" });
                    setCaptchaToken(null);
                    recaptchaRef.current?.reset();
                }, 3000);
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Error submitting review.");
                setCaptchaToken(null);
                recaptchaRef.current?.reset();
            }
        } catch (error) {
            console.error("error:", error);
            alert("Error submitting review. Please try again.");
        }
    };

    useEffect(() => {
        if (reviews.length > 1) {
            const timer = setInterval(nextReview, 8000);
            return () => clearInterval(timer);
        }
    }, [reviews]);

    if (!dict.Reviews || !dict.Reviews.title) {
        return null; // Don't render if translations are missing
    }

    return (
        <section id="reviews" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <ReviewSchema
                reviews={reviews.map(r => ({ name: r.name, company: r.company, rating: r.rating, comment: r.comment, date: r.createdAt }))}
                averageRating={reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 5}
                totalCount={reviews.length}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-brand-green border border-green-100 mb-4"
                    >
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">{dict.Reviews.subtitle}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
                    >
                        {dict.Reviews.title}
                    </motion.h2>
                </div>

                {reviews.length > 0 ? (
                    /* Carousel Container */
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute top-0 left-0 -translate-x-12 -translate-y-6 text-brand-green/10 opacity-50 hidden md:block">
                            <Quote size={120} />
                        </div>

                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col items-center text-center"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-6 w-6 ${i < (reviews[currentIndex]?.rating || 0) ? "fill-brand-orange text-brand-orange" : "text-gray-200"}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-8">
                                        "{reviews[currentIndex]?.comment}"
                                    </p>

                                    {/* Reviewer Info */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 ring-2 ring-brand-green/20">
                                            <img
                                                src={reviews[currentIndex]?.image_url || "https://i.pravatar.cc/150?u=anonymous"}
                                                alt={reviews[currentIndex]?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">{reviews[currentIndex]?.name}</h4>
                                        <p className="text-brand-green font-semibold">
                                            {reviews[currentIndex]?.company}
                                        </p>
                                        <p className="text-sm text-gray-500">{reviews[currentIndex]?.country}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="flex justify-center gap-4 mt-8">
                                <button
                                    onClick={prevReview}
                                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all shadow-sm"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextReview}
                                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all shadow-sm"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-4 w-48 bg-gray-100 rounded mb-4"></div>
                            <div className="h-10 w-64 bg-gray-50 rounded"></div>
                        </div>
                    </div>
                )}

                {/* Write Review Button */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-green transition-all shadow-lg hover:shadow-brand-green/20 group"
                    >
                        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        {dict.Reviews.writeReview}
                    </button>
                </div>
            </div>

            {/* Review Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-10">
                                {isSubmitted ? (
                                    <div className="text-center py-12 flex flex-col items-center">
                                        <div className="w-20 h-20 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle size={48} />
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{dict.Reviews.success}</h3>
                                        <p className="text-gray-500">{dict.Reviews.pending}</p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-3xl font-extrabold text-gray-900 mb-8">{dict.Reviews.writeReview}</h3>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.name} *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.company} *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                        placeholder="Acme Corp"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.country}</label>
                                                    <input
                                                        type="text"
                                                        value={formData.country}
                                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                        placeholder="Spain"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.rating} *</label>
                                                    <div className="flex gap-2 py-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                                className="transition-transform hover:scale-110"
                                                            >
                                                                <Star
                                                                    className={`h-8 w-8 ${star <= formData.rating ? "fill-brand-orange text-brand-orange" : "text-gray-200"}`}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.comment} *</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={formData.comment}
                                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all resize-none"
                                                    placeholder="Tell us about your experience..."
                                                ></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">{dict.Reviews.photo}</label>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 px-6 py-4 rounded-xl hover:bg-gray-100 transition-all flex-1">
                                                            <Upload className="h-5 w-5 text-gray-400" />
                                                            <span className="text-gray-500 text-sm">
                                                                {formData.image_url ? "Photo attached" : dict.Reviews.photo}
                                                            </span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={async (e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        // Basic compression using canvas
                                                                        const reader = new FileReader();
                                                                        reader.onload = (event) => {
                                                                            const img = new Image();
                                                                            img.onload = () => {
                                                                                const canvas = document.createElement('canvas');
                                                                                const MAX_WIDTH = 200;
                                                                                const MAX_HEIGHT = 200;
                                                                                let width = img.width;
                                                                                let height = img.height;

                                                                                if (width > height) {
                                                                                    if (width > MAX_WIDTH) {
                                                                                        height *= MAX_WIDTH / width;
                                                                                        width = MAX_WIDTH;
                                                                                    }
                                                                                } else {
                                                                                    if (height > MAX_HEIGHT) {
                                                                                        width *= MAX_HEIGHT / height;
                                                                                        height = MAX_HEIGHT;
                                                                                    }
                                                                                }
                                                                                canvas.width = width;
                                                                                canvas.height = height;
                                                                                const ctx = canvas.getContext('2d');
                                                                                ctx?.drawImage(img, 0, 0, width, height);
                                                                                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                                                                                setFormData({ ...formData, image_url: dataUrl });
                                                                            };
                                                                            img.src = event.target?.result as string;
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                        {formData.image_url && (
                                                            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-brand-green shadow-sm">
                                                                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-gray-400">Max size: 2MB. Optimized automatically for B2B portal.</p>
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
                                                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                                            >
                                                {dict.Reviews.submit}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
