"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Briefcase, Download, Trash2, Calendar, User, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ApplicationsAdmin() {
    const params = useParams();
    const lang = params?.lang as string;
    const applications = useQuery(api.applications.getAll);
    const removeApplication = useMutation(api.applications.remove);

    const handleDelete = async (id: any) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            await removeApplication({ id });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                            <p className="text-gray-600">Review candidates and manage recruitment</p>
                        </div>
                    </div>
                    <Link
                        href={`/${lang}/admin`}
                        className="px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors font-bold text-sm"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {!applications ? (
                    <div className="grid gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 bg-white rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : applications.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Briefcase size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h2>
                        <p className="text-gray-500">When people apply for jobs, they will appear here.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app._id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                                            <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-black uppercase rounded-full border border-purple-100 italic">
                                                {app.position}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                            <div className="flex items-center gap-3 text-gray-600 font-medium">
                                                <Mail size={18} className="text-gray-400" />
                                                <a href={`mailto:${app.email}`} className="hover:text-brand-orange transition-colors">{app.email}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 font-medium">
                                                <Phone size={18} className="text-gray-400" />
                                                <a href={`tel:${app.phone}`} className="hover:text-brand-orange transition-colors text-xs">{app.phone}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 font-medium">
                                                <Calendar size={18} className="text-gray-400" />
                                                <span className="text-xs">{new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                                <MessageSquare size={14} />
                                                Message from candidate
                                            </div>
                                            <p className="text-gray-700 leading-relaxed italic">{app.message || "No message provided."}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col gap-3 shrink-0">
                                        <a
                                            href={app.cv_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg shadow-brand-orange/20"
                                        >
                                            <Download size={20} />
                                            DOWNLOAD CV
                                        </a>
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            <Trash2 size={20} />
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
