"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, RefreshCw, Upload, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface GalleryImage {
    name: string;
    path: string;
    size: number;
}

export default function GalleryAdmin() {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/gallery');
        const data = await res.json();
        setImages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const filename = file.name.replace(/\s+/g, '-');

        try {
            const res = await fetch(`/api/admin/gallery/upload?filename=${filename}`, {
                method: 'POST',
                body: file,
            });

            if (res.ok) {
                fetchImages();
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (url: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        const res = await fetch('/api/admin/gallery', {
            method: 'DELETE',
            body: JSON.stringify({ url }),
        });

        if (res.ok) {
            fetchImages();
        } else {
            alert('Failed to delete image');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href={`/${lang}/admin`} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Gallery Manager</h1>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600">
                        Managing <strong>{images.length}</strong> images in <strong>Vercel Blob</strong>
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={fetchImages}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>

                        <label className={`flex items-center gap-2 px-6 py-2 bg-brand-orange text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors shadow-sm font-bold text-sm ${uploading ? 'opacity-50' : ''}`}>
                            {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {uploading ? 'Uploading...' : 'Upload Image'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <RefreshCw className="w-12 h-12 text-brand-orange animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {images.map((img) => (
                            <div key={img.name} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                                <Image
                                    src={img.path}
                                    alt={img.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(img.path, img.name)}
                                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform scale-75 group-hover:scale-100 transition-all shadow-xl"
                                        title="Delete Image"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm text-[10px] text-white truncate">
                                    {img.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
