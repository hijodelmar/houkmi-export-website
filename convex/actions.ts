import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const submitWithCaptcha = action({
    args: {
        name: v.string(),
        company: v.string(),
        country: v.string(),
        rating: v.number(),
        comment: v.string(),
        image_url: v.optional(v.string()),
        captchaToken: v.string(),
    },
    handler: async (ctx, args) => {
        const { captchaToken, ...reviewData } = args;

        // 1. Verify reCAPTCHA
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.warn("RECAPTCHA_SECRET_KEY not set in Convex dashboard. Skipping server-side verification.");
        } else {
            const verifyRes = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`,
                { method: "POST" }
            );
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                throw new Error("reCAPTCHA verification failed");
            }
        }

        // 2. Call the mutation to add the review
        await ctx.runMutation(api.reviews.add, reviewData);

        return { success: true };
    },
});
