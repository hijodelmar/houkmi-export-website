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
            token: process.env.houkmi_READ_WRITE_TOKEN,
        });

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error("Upload error:", error);
        const message = error instanceof Error ? error.message : "Failed to upload file";

        if (message.includes("BLOB_READ_WRITE_TOKEN") || message.includes("houkmi_READ_WRITE_TOKEN")) {
            return NextResponse.json({ error: "Vercel Blob storage is not configured correctly. Please check your environment variables." }, { status: 500 });
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
