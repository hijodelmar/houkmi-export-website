import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const galleryDir = path.join(process.cwd(), 'public', 'images', 'pics');

        if (!fs.existsSync(galleryDir)) {
            return NextResponse.json([]);
        }

        const files = fs.readdirSync(galleryDir);
        const images = files.filter(file =>
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        ).map(file => ({
            name: file,
            path: `/images/pics/${file}`,
            size: fs.statSync(path.join(galleryDir, file)).size
        }));

        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { filename } = await request.json();
        const filePath = path.join(process.cwd(), 'public', 'images', 'pics', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
