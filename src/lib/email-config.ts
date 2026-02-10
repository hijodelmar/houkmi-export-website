
import fs from 'fs/promises';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'smtp-config.json');

export interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    fromEmail: string;
    toEmail: string;
}

const DEFAULT_CONFIG: SmtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: '',
    pass: '', // App Password
    fromEmail: '',
    toEmail: 'info@houkmiexport.com'
};

export async function getSmtpConfig(): Promise<SmtpConfig> {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return DEFAULT_CONFIG;
    }
}

export async function saveSmtpConfig(config: SmtpConfig): Promise<void> {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}
