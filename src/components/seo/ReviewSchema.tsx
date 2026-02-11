import React from 'react';

interface Review {
    name: string;
    company: string;
    rating: number;
    comment: string;
    date: string;
}

export default function ReviewSchema({ reviews, averageRating, totalCount }: { reviews: Review[], averageRating: number, totalCount: number }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "itemReviewed": {
            "@type": "Organization",
            "name": "HOUKMI EXPORT",
            "image": "https://houkmiexport.com/images/logo.svg",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Agadir",
                "addressCountry": "MA"
            }
        },
        "ratingValue": averageRating.toString(),
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": totalCount.toString(),
        "review": reviews.map(r => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": r.name
            },
            "publisher": {
                "@type": "Organization",
                "name": r.company
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": r.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": r.comment,
            "datePublished": r.date
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
