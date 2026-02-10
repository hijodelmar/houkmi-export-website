import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
    return (
        <Image
            src="/images/logo2.png"
            alt="HOUKMI EXPORT"
            width={180}
            height={60}
            className={className}
            priority
        />
    );
}
