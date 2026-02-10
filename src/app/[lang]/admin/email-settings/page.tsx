
"use client";

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function EmailSettings() {
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

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <div className="uppercase tracking-wide text-sm text-brand-orange font-semibold mb-4">Admin Panel</div>
                <h1 className="block mt-1 text-2xl leading-tight font-bold text-black mb-6">Email SMTP Configuration</h1>

                {message && (
                    <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SMTP Host (Gmail: smtp.gmail.com)</label>
                        <input
                            type="text"
                            value={config.host}
                            onChange={e => setConfig({ ...config, host: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Port (Gmail: 465)</label>
                            <input
                                type="number"
                                value={config.port}
                                onChange={e => setConfig({ ...config, port: parseInt(e.target.value) })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            />
                        </div>
                        <div className="flex items-center mt-6">
                            <input
                                type="checkbox"
                                checked={config.secure}
                                onChange={e => setConfig({ ...config, secure: e.target.checked })}
                                className="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">Secure (SSL/TLS)</label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gmail User (Your Email)</label>
                        <input
                            type="email"
                            value={config.user}
                            onChange={e => setConfig({ ...config, user: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gmail App Password</label>
                        <input
                            type="password"
                            value={config.pass}
                            placeholder="xxxx xxxx xxxx xxxx"
                            onChange={e => setConfig({ ...config, pass: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                        />
                        <p className="text-xs text-gray-500 mt-1">Use an App Password if 2FA is enabled.</p>
                    </div>

                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700">Receiver Email (Where emails go)</label>
                        <input
                            type="email"
                            value={config.toEmail}
                            onChange={e => setConfig({ ...config, toEmail: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Configuration'}
                        {!saving && <Save className="ml-2 h-5 w-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
