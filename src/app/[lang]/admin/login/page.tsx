"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useParams();
    const lang = params?.lang || 'en';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
        }).then(res => {
            if (res.ok) {
                router.push(`/${lang}/admin`);
            } else {
                setError('Invalid password');
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="mb-8 flex justify-center">
                <img
                    src="/images/logo22.png"
                    alt="Houkmi Export Logo"
                    className="h-32 w-auto object-contain drop-shadow-sm"
                />
            </div>
            <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
