import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "h-16 w-auto" }: { className?: string }) {
    return (
        <Image
            src="/images/logo2.png"
            alt="HOUKMI EXPORT"
            width={280}
            height={90}
            className={className}
            priority
        />
    );
}
