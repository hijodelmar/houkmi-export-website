import { NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/reviews-store';

export async function GET() {
    const reviews = await getReviews();
    // Only return approved reviews for the public API
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    return NextResponse.json(approvedReviews);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, country, rating, comment, image_url } = body;

        if (!name || !company || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newReview = await addReview({
            name,
            company,
            country: country || "",
            rating,
            comment,
            image_url
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
