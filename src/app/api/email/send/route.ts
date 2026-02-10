
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/email-config';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();
        const config = await getSmtpConfig();

        if (!config.user || !config.pass) {
            return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${config.user}>`, // Gmail requires from to be the authenticated user usually, or use reply-to
            replyTo: email,
            to: config.toEmail,
            subject: `New Contact from Website: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
