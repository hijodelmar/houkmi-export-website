import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getApproved = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("reviews")
            .filter((q) => q.eq(q.field("status"), "approved"))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("reviews").collect();
    },
});

export const add = mutation({
    args: {
        name: v.string(),
        company: v.string(),
        country: v.string(),
        rating: v.number(),
        comment: v.string(),
        image_url: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const reviewId = await ctx.db.insert("reviews", {
            ...args,
            status: "pending",
            createdAt: new Date().toISOString(),
        });
        return reviewId;
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("reviews"),
        status: v.union(v.literal("approved"), v.literal("rejected")),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});

export const remove = mutation({
    args: { id: v.id("reviews") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
