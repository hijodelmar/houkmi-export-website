import { promises as fs } from 'fs';
import path from 'path';

export interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    fromEmail?: string;
    toEmail: string;
}

const CONFIG_FILE = path.join(process.cwd(), 'smtp-config.json');

const DEFAULT_CONFIG: SmtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: '',
    pass: '',
    toEmail: '',
};

export async function getSmtpConfig(): Promise<SmtpConfig> {
    // Try environment variables first (for Vercel production)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        return {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE !== 'false',
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            fromEmail: process.env.SMTP_FROM_EMAIL || '',
            toEmail: process.env.SMTP_TO_EMAIL || '',
        };
    }

    // Fall back to config file (for local development)
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return DEFAULT_CONFIG;
    }
}

export async function saveSmtpConfig(config: SmtpConfig): Promise<void> {
    // In production (Vercel), we can't write files
    // Users should set environment variables instead
    if (process.env.VERCEL) {
        throw new Error('Cannot save config in production. Please use Vercel environment variables.');
    }

    // Local development: save to file
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}
