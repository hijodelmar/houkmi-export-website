
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/email-config';

export async function POST(request: Request) {
    try {
        const { name, email, message, captcha } = await request.json();

        // Verify reCAPTCHA Enterprise Assessment
        const projectID = "houkmiexport";
        const apiKey = "AIzaSyCiZDzFjtGcUD-jEQF3rrXtrUu_cogXx08";
        const siteKey = "6LcI7GcsAAAAABfEZ115oceso-A9xqoX_Gueg5er";

        const verifyRes = await fetch(
            `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: {
                        token: captcha,
                        siteKey: siteKey,
                        expectedAction: 'CONTACT'
                    }
                })
            }
        );

        const verifyData = await verifyRes.json();

        // Score 0.0 is bot, 1.0 is human. We accept 0.5+
        if (!verifyData.tokenProperties?.valid || (verifyData.riskAnalysis?.score !== undefined && verifyData.riskAnalysis.score < 0.5)) {
            console.error("reCAPTCHA failed:", verifyData);
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
