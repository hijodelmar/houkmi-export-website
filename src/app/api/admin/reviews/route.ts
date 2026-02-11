import { NextResponse } from 'next/server';
import { getReviews, updateReviewStatus, deleteReview } from '@/lib/reviews-store';

export const dynamic = 'force-dynamic';

// NOTE: In a real production app, you would add authentication middleware here
// For now, we are implementing the logic.

export async function GET() {
    const reviews = await getReviews();
    return NextResponse.json(reviews);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updated = await updateReviewStatus(id, status);
        if (!updated) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const deleted = await deleteReview(id);
        if (!deleted) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
