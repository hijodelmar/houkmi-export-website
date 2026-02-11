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

        // Verify Captcha v2 (Classic)
        const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6Lcb_WcsAAAAAIX5PdiQGMdrFV0uliGVrjF_I4kc";
        const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`, {
            method: 'POST'
        });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            console.error("reCAPTCHA v2 failed:", verifyData);
            return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 });
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
