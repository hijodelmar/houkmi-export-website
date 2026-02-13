"use client";

import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Contact({ lang, dict, initialProduct = "Tomatoes" }: { lang: string; dict: any; initialProduct?: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const addClient = useMutation(api.clients.add);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            alert('Please verify that you are not a robot.');
            return;
        }

        setStatus('loading');

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get('name') as string,
                company: formData.get('company') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                product: formData.get('product') as string,
                volume: formData.get('volume') as string,
                incoterms: formData.get('incoterms') as string,
                destination: formData.get('destination') as string,
                message: formData.get('message') as string,
                captcha: captchaToken,
            };

            // 1. Send Email
            const res = await fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // 2. Save to Convex
            await addClient({
                name: data.name,
                company: data.company,
                email: data.email,
                phone: data.phone,
                product: data.product,
                volume: data.volume,
                incoterms: data.incoterms,
                destination: data.destination,
                message: data.message,
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                recaptchaRef.current?.reset();
                setCaptchaToken(null);
            } else {
                alert('Error: ' + (result.details || result.error || 'Unknown error'));
                setStatus('error');
                recaptchaRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (error) {
            console.error("error:", error);
            alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-brand-orange/5 via-white to-brand-purple/5" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                            {dict.Contact.title}
                        </h2>
                        <p className="text-gray-700 mb-8 text-lg">
                            {dict.Contact.description}
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform">
                                <MapPin style={{ color: '#7CB342' }} className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{dict.Contact.locationLabel}</h4>
                                    <p className="text-gray-700">{dict.Contact.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform">
                                <Mail style={{ color: '#FF6F00' }} className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{dict.Contact.emailLabel}</h4>
                                    <p className="text-gray-700">info@houkmiexport.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform">
                                <Phone style={{ color: '#AB47BC' }} className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{dict.Contact.phoneLabel}</h4>
                                    <p className="text-gray-700">+39 348 229 6062 (Wiliam Lombardi)</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed - Agadir City Center */}
                        <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27536.32625345704!2d-9.610574892480456!3d30.42111435212956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e9daa54fa9%3A0xdb98579d49265e7d!2sAgadir%2C%20Morocco!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden"
                    >
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl"></div>

                        {status === 'success' && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-3xl">
                                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Request Sent!</h3>
                                    <p className="text-gray-600 mt-2">We will send you a quotation shortly.</p>
                                </motion.div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.name}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.company}</label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="Company Ltd."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.email}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="sales@company.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.phone}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="+33 6 12 34 56 78"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="product" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.product}</label>
                                    <select
                                        name="product"
                                        id="product"
                                        defaultValue={initialProduct}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium appearance-none"
                                    >
                                        <option value="Tomatoes">{dict.Products.tomatoes}</option>
                                        <option value="Citrus">{dict.Products.oranges}</option>
                                        <option value="Peppers">{dict.Products.peppers}</option>
                                        <option value="Watermelon">{dict.Products.watermelons}</option>
                                        <option value="Other">{dict.Contact.product_other}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="volume" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.volume}</label>
                                    <input
                                        type="text"
                                        name="volume"
                                        id="volume"
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="e.g. 1 Container / 20 Pallets"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="incoterms" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.incoterms}</label>
                                    <select
                                        name="incoterms"
                                        id="incoterms"
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium appearance-none"
                                    >
                                        <option value="FOB">{dict.Contact.incoterm_fob}</option>
                                        <option value="CIF">{dict.Contact.incoterm_cif}</option>
                                        <option value="DAP">{dict.Contact.incoterm_dap}</option>
                                        <option value="EXW">{dict.Contact.incoterm_exw}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="destination" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.destination}</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        id="destination"
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                        placeholder="Port of Marseille / Madrid"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">{dict.Contact.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={3}
                                    required
                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 font-medium"
                                    placeholder="Specific sizes, packaging preferences, or target delivery dates..."
                                ></textarea>
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
                                disabled={status === 'loading'}
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg py-5 px-8 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative tracking-wide">{status === 'loading' ? 'Sending Request...' : dict.Contact.send}</span>
                                <Send className={`w-6 h-6 relative ${status === 'loading' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
