import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { blobs } = await list({
            prefix: 'gallery/',
            token: process.env.houkmi_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
        });

        const images = blobs.map(blob => ({
            name: blob.pathname.replace('gallery/', ''),
            path: blob.url,
            size: blob.size
        }));

        return NextResponse.json(images);
    } catch (error: any) {
        console.error('List Error:', error);
        return NextResponse.json({ error: 'Failed to list images', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        await del(url, {
            token: process.env.houkmi_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Delete Error:', error);
        return NextResponse.json({ error: 'Failed to delete image', details: error.message }, { status: 500 });
    }
}
