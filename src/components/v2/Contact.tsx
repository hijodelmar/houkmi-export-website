"use client";

import { useState, useRef } from "react";
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
        <section id="contact" className="py-24 bg-brand-green/95 relative overflow-hidden">
            {/* Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 blur-3xl rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                                Start Your Next <br />
                                <span className="text-brand-orange">Import Order</span>
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed mb-12">
                                Ready to bring premium Moroccan produce to your market?
                                Our team is standing by to discuss logistics, pricing, and availability.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {[
                                { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+39 348 229 6062" },
                                { icon: <Mail className="w-6 h-6" />, label: "Email", value: "info@houkmiexport.com" },
                                { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "Agadir, Morocco" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-orange transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{item.label}</div>
                                        <div className="text-xl font-bold text-white">{item.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {status === 'success' && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-[2.5rem]">
                                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">Request Sent!</h3>
                                    <p className="text-gray-600">We will send you a quotation shortly.</p>
                                </motion.div>
                            </div>
                        )}

                        <h3 className="text-2xl font-black text-gray-900 mb-8">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                                    <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</label>
                                    <input type="text" name="company" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="Company Ltd." />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                    <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="sales@company.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</label>
                                    <input type="tel" name="phone" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="+33 6 12 34 56 78" />
                                </div>
                            </div>

                            {/* Additional Logistics Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product</label>
                                    <select name="product" defaultValue={initialProduct} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900 appearance-none">
                                        <option value="Tomatoes">Tomatoes</option>
                                        <option value="Citrus">Citrus (Oranges)</option>
                                        <option value="Peppers">Peppers</option>
                                        <option value="Watermelon">Watermelon</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Volume</label>
                                    <input type="text" name="volume" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="e.g. 1 Container" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Incoterms</label>
                                    <select name="incoterms" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900 appearance-none">
                                        <option value="FOB">FOB</option>
                                        <option value="CIF">CIF</option>
                                        <option value="DAP">DAP</option>
                                        <option value="EXW">EXW</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</label>
                                    <input type="text" name="destination" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="e.g. Marseille, France" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                <textarea name="message" rows={4} required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all font-medium text-gray-900" placeholder="Tell us about your requirements..."></textarea>
                            </div>

                            <div className="flex justify-center py-2 h-[78px]">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LdvEGgsAAAAAB1clNIRf_SQSjqHnqeiUBG6xmj5"}
                                    onChange={(token) => setCaptchaToken(token)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-orange text-white font-black uppercase tracking-widest py-5 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                                <Send className={`w-4 h-4 ${status === 'loading' ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform`} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
