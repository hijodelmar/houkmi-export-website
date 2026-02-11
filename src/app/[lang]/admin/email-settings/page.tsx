"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmailSettings() {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [config, setConfig] = useState({
        host: '',
        port: 465,
        secure: true,
        user: '',
        pass: '',
        toEmail: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/email/config')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/email/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) {
                setMessage('Settings saved successfully!');
            } else {
                setMessage('Failed to save settings');
            }
        } catch (error) {
            setMessage('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest">
            Loading settings...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href={`/${lang}/admin`} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Email & SMTP Settings</h1>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="uppercase tracking-widest text-xs text-brand-orange font-black mb-1">Infrastructure</div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-8">SMTP Configuration</h2>

                    {message && (
                        <div className={`p-4 mb-8 rounded-2xl font-bold flex items-center gap-3 ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            <div className={`w-2 h-2 rounded-full ${message.includes('success') ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">SMTP Host</label>
                            <input
                                type="text"
                                value={config.host}
                                placeholder="smtp.gmail.com"
                                onChange={e => setConfig({ ...config, host: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">Port</label>
                                <input
                                    type="number"
                                    value={config.port}
                                    placeholder="465"
                                    onChange={e => setConfig({ ...config, port: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-center mt-8">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.secure}
                                        onChange={e => setConfig({ ...config, secure: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                    <span className="ml-3 text-sm font-bold text-gray-900">Secure (SSL/TLS)</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">Username</label>
                                <input
                                    type="email"
                                    value={config.user}
                                    placeholder="info@houkmiexport.com"
                                    onChange={e => setConfig({ ...config, user: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">App Password</label>
                                <input
                                    type="password"
                                    value={config.pass}
                                    placeholder="•••• •••• •••• ••••"
                                    onChange={e => setConfig({ ...config, pass: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">Receiver Email</label>
                            <input
                                type="email"
                                value={config.toEmail}
                                placeholder="notifications@houkmiexport.com"
                                onChange={e => setConfig({ ...config, toEmail: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                            />
                            <p className="mt-2 text-xs text-gray-500">All customer inquiries will be sent to this address.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-orange text-white font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
                        >
                            {saving ? 'Saving...' : 'Save Configuration'}
                            {!saving && <Save className="w-5 h-5" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
