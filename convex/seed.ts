import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seed = mutation({
    args: {
        reviews: v.array(v.object({
            name: v.string(),
            company: v.string(),
            country: v.string(),
            rating: v.number(),
            comment: v.string(),
            image_url: v.optional(v.string()),
            status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
            createdAt: v.string(),
        })),
    },
    handler: async (ctx, args) => {
        // Clear existing reviews first to avoid duplicates if re-seeded
        const existing = await ctx.db.query("reviews").collect();
        for (const review of existing) {
            await ctx.db.delete(review._id);
        }

        for (const review of args.reviews) {
            await ctx.db.insert("reviews", review);
        }
    },
});
