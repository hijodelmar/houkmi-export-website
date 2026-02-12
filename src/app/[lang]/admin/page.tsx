import React from 'react';
import Link from 'next/link';
import { Settings, MessageSquare, Image as ImageIcon, Briefcase, Users } from 'lucide-react';
import LogoutButton from '@/components/ui/LogoutButton';

export default async function AdminDashboard({ params }: { params: { lang: string } }) {
    const { lang } = await params;

    const cards = [
        {
            title: "Manage Reviews",
            description: "Approve, hide or delete customer testimonials.",
            href: `/${lang}/admin/reviews`,
            icon: <MessageSquare className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Recruitment",
            description: "View job applications and download resumes.",
            href: `/${lang}/admin/applications`,
            icon: <Briefcase className="w-8 h-8 text-purple-500" />
        },
        {
            title: "Client List",
            description: "Manage inquiries and leads from the contact form.",
            href: `/${lang}/admin/clients`,
            icon: <Users className="w-8 h-8 text-brand-orange" />
        },
        {
            title: "Email & SMTP Settings",
            description: "Configure where inquiries are sent and SMTP details.",
            href: `/${lang}/admin/email-settings`,
            icon: <Settings className="w-8 h-8 text-orange-500" />
        },
        {
            title: "Gallery Manager",
            description: "View and manage photos in the public gallery.",
            href: `/${lang}/admin/gallery`,
            icon: <ImageIcon className="w-8 h-8 text-green-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
                        <p className="text-gray-600">Centralized management for Houkmi Export</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/${lang}`}
                            className="text-gray-500 hover:text-brand-orange transition-colors"
                        >
                            View Site
                        </Link>
                        <LogoutButton lang={lang} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, i) => (
                        <Link
                            key={i}
                            href={card.href}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-gray-900">{card.title}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                            <div className="mt-6 flex items-center text-brand-orange font-bold text-sm">
                                Open Manager
                                <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
