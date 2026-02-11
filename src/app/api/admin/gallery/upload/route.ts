import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const filename = file.name.replace(/\s+/g, '-');

        // Upload to Vercel Blob
        const blob = await put(`gallery/${filename}`, file, {
            access: 'public',
        });

        return NextResponse.json({ success: true, path: blob.url });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
