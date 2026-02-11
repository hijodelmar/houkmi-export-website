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
        ).map(file => `/images/pics/${file}`);

        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}
