
import { NextResponse } from 'next/server';
import { getSmtpConfig, saveSmtpConfig } from '@/lib/email-config';

export async function GET() {
    const config = await getSmtpConfig();
    return NextResponse.json(config);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await saveSmtpConfig(body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
