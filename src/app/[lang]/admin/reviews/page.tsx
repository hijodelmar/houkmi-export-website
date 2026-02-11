"use client";

import { useState, useEffect } from "react";
import { Check, Shield, Trash2, Globe, Building2, Star, Filter, LogOut, Quote, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/ui/LogoutButton";

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

export default function AdminDashboard() {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Error fetching admin reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
        try {
            const res = await fetch('/api/admin/reviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) fetchReviews();
        } catch (error) {
            alert("Error updating review");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        try {
            const res = await fetch(`/api/admin/reviews?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchReviews();
        } catch (error) {
            alert("Error deleting review");
        }
    };

    const filteredReviews = filter === 'all'
        ? reviews
        : reviews.filter(r => r.status === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar / Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                                <Link href={`/${lang}/admin`} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                    <ArrowLeft className="w-6 h-6" />
                                </Link>
                                <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold text-gray-900">Review Moderation</h2>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Admin Panel</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link
                                href={`/${lang}`}
                                className="text-gray-500 hover:text-brand-orange transition-colors"
                            >
                                View Site
                            </Link>
                            <LogoutButton lang={lang} />
                        </div>
                    </div>
                </div>
            </div>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-bold text-gray-500 uppercase mb-2">Total Reviews</p>
                        <p className="text-3xl font-extrabold text-gray-900">{reviews.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-bold text-yellow-600 uppercase mb-2">Pending</p>
                        <p className="text-3xl font-extrabold text-gray-900">
                            {reviews.filter(r => r.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-bold text-green-600 uppercase mb-2">Approved</p>
                        <p className="text-3xl font-extrabold text-gray-900">
                            {reviews.filter(r => r.status === 'approved').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-bold text-blue-600 uppercase mb-2">Avg Rating</p>
                        <p className="text-3xl font-extrabold text-gray-900">
                            {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)} ⭐
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
                    <div className="flex items-center gap-2 text-gray-400 px-3">
                        <Filter size={18} />
                        <span className="font-bold text-sm">Filter:</span>
                    </div>
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all whitespace-nowrap ${filter === s
                                ? "bg-gray-900 text-white shadow-lg"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                            <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-sm">Loading reviews...</p>
                        </div>
                    ) : filteredReviews.length === 0 ? (
                        <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                            <Quote size={48} className="text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg font-medium">No reviews found matching your filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredReviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100">
                                                <img
                                                    src={review.image_url || "https://i.pravatar.cc/150?u=anonymous"}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-gray-900 flex items-center gap-2">
                                                    {review.name}
                                                    {review.status === 'approved' && <Check className="text-green-500" size={16} strokeWidth={3} />}
                                                </h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Building2 size={14} />
                                                    <span>{review.company}</span>
                                                    <span>•</span>
                                                    <Globe size={14} />
                                                    <span>{review.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${review.status === 'approved' ? "bg-green-100 text-green-700" :
                                            review.status === 'rejected' ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {review.status}
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < review.rating ? "fill-brand-orange text-brand-orange" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 italic border-l-4 border-gray-100 pl-4 mb-6 leading-relaxed">
                                        "{review.comment}"
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={20} />
                                            </button>

                                            {review.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(review.id, 'rejected')}
                                                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                                                >
                                                    Reject
                                                </button>
                                            )}

                                            {review.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(review.id, 'approved')}
                                                    className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-md shadow-green-100 transition-all"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
