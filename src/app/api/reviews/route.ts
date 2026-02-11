import { NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/reviews-store';

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
        const projectID = "houkmiexport";
        const apiKey = "AIzaSyCiZDzFjtGcUD-jEQF3rrXtrUu_cogXx08";
        const siteKey = "6LcI7GcsAAAAABfEZ115oceso-A9xqoX_Gueg5er";

        const verifyRes = await fetch(
            `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: {
                        token: captcha,
                        siteKey: siteKey,
                        expectedAction: 'REVIEW'
                    }
                })
            }
        );

        const verifyData = await verifyRes.json();

        // Score 0.0 is bot, 1.0 is human. We accept 0.5+
        if (!verifyData.tokenProperties?.valid || (verifyData.riskAnalysis?.score !== undefined && verifyData.riskAnalysis.score < 0.5)) {
            console.error("reCAPTCHA failed:", verifyData);
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
