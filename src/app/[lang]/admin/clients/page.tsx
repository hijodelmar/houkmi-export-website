"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Users, Trash2, Calendar, User, Mail, Phone, MessageSquare, Building2, MapPin, Package, Scale } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClientsAdmin() {
    const params = useParams();
    const lang = params?.lang as string;
    const clients = useQuery(api.clients.getAll);
    const removeClient = useMutation(api.clients.remove);

    const handleDelete = async (id: any) => {
        if (window.confirm("Are you sure you want to delete this client inquiry?")) {
            await removeClient({ id });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-brand-orange rounded-2xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Client Inquiries</h1>
                            <p className="text-gray-600">Manage leads and potential customer requests</p>
                        </div>
                    </div>
                    <Link
                        href={`/${lang}/admin`}
                        className="px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors font-bold text-sm"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {!clients ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-64 bg-white rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : clients.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Users size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No inquiries yet</h2>
                        <p className="text-gray-500">When people contact you via the form, they will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {clients.map((client) => (
                            <div key={client._id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8">
                                    <button
                                        onClick={() => handleDelete(client._id)}
                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {/* Header Info */}
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-brand-orange/5 transition-colors">
                                            <Building2 className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-brand-orange transition-colors">{client.company}</h3>
                                            <div className="flex items-center gap-2 text-gray-500 font-bold text-sm flex-wrap">
                                                <User size={14} className="text-brand-orange" /> {client.name}
                                                <span className="opacity-20">•</span>
                                                <Calendar size={14} /> {new Date(client.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact & Request Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Contact Information</p>
                                            <div className="flex items-center gap-3 text-gray-700 font-bold">
                                                <Mail size={18} className="text-brand-orange" />
                                                <a href={`mailto:${client.email}`} className="hover:underline text-xs">{client.email}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700 font-bold">
                                                <Phone size={18} className="text-brand-orange" />
                                                <a href={`tel:${client.phone}`} className="hover:underline text-xs">{client.phone}</a>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Logistics Requirements</p>
                                            <div className="flex items-center gap-3 text-gray-700 font-bold">
                                                <Package size={18} className="text-brand-green" />
                                                <span className="text-xs">{client.product} ({client.volume})</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700 font-bold">
                                                <Scale size={18} className="text-brand-green" />
                                                <span className="text-xs">{client.incoterms} - {client.destination}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange/20 rounded-full"></div>
                                        <div className="pl-6">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Customer Message</p>
                                            <p className="text-gray-700 leading-relaxed font-medium italic">
                                                "{client.message}"
                                            </p>
                                        </div>
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
