import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    // If there's a filename in searchParams and it's a direct body upload (backwards compatibility or small files)
    if (filename && request.body) {
        try {
            const blob = await put(`gallery/${filename}`, request.body, {
                access: 'public',
                token: process.env.houkmi_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
            });
            return NextResponse.json({ success: true, path: blob.url });
        } catch (error: any) {
            console.error('Direct Upload Error:', error);
            return NextResponse.json({ error: 'Failed to upload image', details: error.message }, { status: 500 });
        }
    }

    // Otherwise, assume it's a Vercel Blob client-side upload protocol (handleUpload)
    try {
        const body = (await request.json()) as HandleUploadBody;
        const jsonResponse = await handleUpload({
            body,
            request,
            token: process.env.houkmi_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
            onBeforeGenerateToken: async (pathname) => {
                // Here you can add authentication checks
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    tokenPayload: JSON.stringify({
                        // optional
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // This is called on your server after the upload is completed
                console.log('blob upload completed', blob, tokenPayload);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error: any) {
        console.error('Handle Upload Error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 400 },
        );
    }
}
