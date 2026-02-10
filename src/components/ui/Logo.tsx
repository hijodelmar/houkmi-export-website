import React from 'react';

export default function Logo({ className = "h-12 w-auto", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Logo Icon - Abstract H with Leaf and Globe arc */}
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto aspect-square">
                <circle cx="50" cy="50" r="45" stroke="url(#gradient-globe)" strokeWidth="4" strokeLinecap="round" strokeDasharray="20 10" className="opacity-30" />
                <path d="M35 30V70M65 30V70M35 50H65" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
                <path d="M65 30C65 30 85 20 85 45C85 65 65 70 65 70" stroke="url(#gradient-leaf)" strokeWidth="0" fill="url(#gradient-leaf)" className="opacity-90" />
                <path d="M65 50C75 50 90 45 90 30C90 15 75 10 65 30Z" fill="url(#gradient-leaf-2)" />

                <defs>
                    <linearGradient id="gradient-globe" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6F00" />
                        <stop offset="1" stopColor="#FFD600" />
                    </linearGradient>
                    <linearGradient id="gradient-leaf" x1="60" y1="30" x2="90" y2="70" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7CB342" />
                        <stop offset="1" stopColor="#2E7D32" />
                    </linearGradient>
                    <linearGradient id="gradient-leaf-2" x1="60" y1="10" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#aeea00" />
                        <stop offset="1" stopColor="#64dd17" />
                    </linearGradient>
                </defs>
            </svg>

            {showText && (
                <div className="flex flex-col justify-center">
                    <span className="font-extrabold text-xl leading-none tracking-tight text-gray-900 border-l-2 border-brand-orange pl-3">
                        HOUKMI
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-green pl-3 uppercase">
                        Export
                    </span>
                </div>
            )}
        </div>
    );
}
