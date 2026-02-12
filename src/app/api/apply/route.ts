import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("cv") as File;

        if (!file) {
            return NextResponse.json({ error: "No CV file provided" }, { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(`cvs/${Date.now()}-${file.name}`, file, {
            access: "public",
        });

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
