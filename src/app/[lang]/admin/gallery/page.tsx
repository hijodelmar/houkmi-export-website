"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, RefreshCw, Upload, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';

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
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const fileList = Array.from(files);

        try {
            // Process all files in parallel using client-side upload
            await Promise.all(fileList.map(async (file) => {
                const filename = file.name.replace(/\s+/g, '-');
                await upload(`gallery/${filename}`, file, {
                    access: 'public',
                    handleUploadUrl: '/api/admin/gallery/upload',
                });
            }));

            fetchImages();
        } catch (error: any) {
            console.error('Upload Error:', error);
            alert(`Upload failed: ${error.message || 'Please try again.'}`);
        } finally {
            setUploading(false);
            if (e.target) e.target.value = ''; // Reset input
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
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href={`/${lang}/admin`} className="p-2 hover:bg-brand-orange/10 rounded-full transition-colors text-brand-orange">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Gallery Manager</h1>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange"></div>
                    <div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Status</p>
                        <p className="text-gray-900 font-medium">
                            Cloud Storage: <strong>{images.length}</strong> images in <strong>Vercel Blob</strong>
                        </p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={fetchImages}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all border border-gray-200 active:scale-95"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>

                        <label className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-brand-orange text-white rounded-2xl cursor-pointer hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 font-black text-sm active:scale-95 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {uploading ? 'Uploading Bulk...' : 'Upload Images'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <RefreshCw className="w-16 h-16 text-brand-orange animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing with Cloud...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {images.map((img) => (
                            <div key={img.name} className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-square">
                                <Image
                                    src={img.path}
                                    alt={img.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />

                                {/* Overlay with glassmorphism */}
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                    <button
                                        onClick={() => handleDelete(img.path, img.name)}
                                        className="p-4 bg-red-500/90 text-white rounded-3xl hover:bg-red-600 hover:scale-110 active:scale-90 transition-all shadow-2xl backdrop-blur-md"
                                        title="Delete Image"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Filename tag */}
                                <div className="absolute bottom-3 left-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-xl text-[9px] font-bold text-gray-800 truncate border border-white/50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    {img.name}
                                </div>
                            </div>
                        ))}

                        {/* Empty state */}
                        {images.length === 0 && (
                            <div className="col-span-full py-24 text-center border-4 border-dashed border-gray-200 rounded-[3rem]">
                                <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm text-balance">The gallery is empty.<br />Start uploading your agricultural story.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
}
