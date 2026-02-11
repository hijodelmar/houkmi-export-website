
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/email-config';
import { createAssessment } from '@/lib/recaptcha-server';

export async function POST(request: Request) {
    try {
        const { name, email, message, captcha } = await request.json();

        // Verify reCAPTCHA Enterprise Assessment
        const score = await createAssessment({
            token: captcha,
            recaptchaAction: 'CONTACT'
        });

        // Score 0.0 is bot, 1.0 is human. We accept 0.5+
        if (score === null || score < 0.5) {
            console.error("reCAPTCHA check failed. Score:", score);
            return NextResponse.json({ error: 'Security check failed. Please try again.' }, { status: 400 });
        }

        const config = await getSmtpConfig();

        if (!config.user || !config.pass) {
            return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 });
        }

        console.log('=== SMTP CONFIG ===');
        console.log('Host:', config.host);
        console.log('Port:', config.port);
        console.log('User:', config.user);
        console.log('To Email:', config.toEmail);
        console.log('==================');

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
        console.error('=== EMAIL SEND ERROR ===');
        console.error('Error details:', error);
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
        console.error('=======================');
        return NextResponse.json({
            error: 'Failed to send email',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
