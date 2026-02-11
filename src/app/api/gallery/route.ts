import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'gallery/' });

        // Return only the URLs
        const images = blobs.map(blob => blob.url);

        return NextResponse.json(images);
    } catch (error) {
        console.error('Public List Error:', error);
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}
