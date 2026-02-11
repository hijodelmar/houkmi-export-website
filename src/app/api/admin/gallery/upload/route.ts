import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replace(/\s+/g, '-');
        const galleryDir = path.join(process.cwd(), 'public', 'images', 'pics');

        if (!fs.existsSync(galleryDir)) {
            fs.mkdirSync(galleryDir, { recursive: true });
        }

        const filePath = path.join(galleryDir, filename);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ success: true, path: `/images/pics/${filename}` });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
