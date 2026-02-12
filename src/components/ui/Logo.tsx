import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "h-20 w-auto", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex items-center ${className}`}>
            <div className="relative h-full flex items-center">
                <Image
                    src="/images/logohoukmibg2.png"
                    alt="HOUKMI EXPORT Logo"
                    width={300}
                    height={100}
                    className="object-contain h-full w-auto"
                    priority
                />
            </div>

            {showText && (
                <div className="flex flex-col justify-center border-l-2 border-brand-orange pl-3 ml-4">
                    <span className="font-extrabold text-2xl leading-none tracking-tight text-gray-900">
                        HOUKMI
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-green uppercase">
                        Export
                    </span>
                </div>
            )}
        </div>
    );
}
