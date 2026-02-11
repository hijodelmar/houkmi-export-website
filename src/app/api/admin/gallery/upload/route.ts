import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename') || 'image.webp';

        if (!request.body) {
            return NextResponse.json({ error: 'No body provided' }, { status: 400 });
        }

        // Upload to Vercel Blob using the body stream directly
        const blob = await put(`gallery/${filename}`, request.body, {
            access: 'public',
            token: process.env.houkmi_READ_WRITE_TOKEN,
        });

        return NextResponse.json({ success: true, path: blob.url });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
