"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    skeleton?: ReactNode;
    id?: string;
}

export default function LazySection({
    children,
    threshold = 0.1,
    rootMargin = "100px",
    skeleton,
    id
}: LazySectionProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoaded) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isLoaded, threshold, rootMargin]);

    return (
        <div id={id} ref={containerRef} className="min-h-[200px]">
            {isLoaded ? children : skeleton || <div className="h-40 w-full animate-pulse bg-gray-50 rounded-3xl" />}
        </div>
    );
}
