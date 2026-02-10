import { NextResponse } from 'next/server';
import { getSmtpConfig } from '@/lib/email-config';

export async function GET() {
    try {
        const config = await getSmtpConfig();

        return NextResponse.json({
            configured: !!(config.user && config.pass),
            host: config.host,
            port: config.port,
            user: config.user ? '***' + config.user.slice(-10) : 'NOT SET',
            pass: config.pass ? '***' + config.pass.slice(-4) : 'NOT SET',
            toEmail: config.toEmail || 'NOT SET',
            env: {
                hasSmtpUser: !!process.env.SMTP_USER,
                hasSmtpPass: !!process.env.SMTP_PASS,
                isVercel: !!process.env.VERCEL,
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
