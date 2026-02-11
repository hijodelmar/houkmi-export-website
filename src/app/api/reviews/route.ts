import { NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/reviews-store';
import { createAssessment } from '@/lib/recaptcha-server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const reviews = await getReviews();
    // Only return approved reviews for the public API
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    return NextResponse.json(approvedReviews);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, country, rating, comment, image_url, captcha } = body;

        // Verify reCAPTCHA Enterprise Assessment
        const score = await createAssessment({
            token: captcha,
            recaptchaAction: 'REVIEW'
        });

        // Score 0.0 is bot, 1.0 is human. We accept 0.5+
        if (score === null || score < 0.5) {
            console.error("reCAPTCHA check failed. Score:", score);
            return NextResponse.json({ error: 'Security check failed. Please try again.' }, { status: 400 });
        }

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
