"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ lang }: { lang: string }) {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch('/api/admin/logout', { method: 'POST' });
        if (res.ok) {
            router.push(`/${lang}/admin/login`);
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-bold"
        >
            <LogOut className="w-5 h-5" />
            Logout
        </button>
    );
}
