import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        position: v.string(),
        message: v.string(),
        cv_url: v.string(),
    },
    handler: async (ctx, args) => {
        const applicationId = await ctx.db.insert("applications", {
            ...args,
            createdAt: new Date().toISOString(),
        });
        return applicationId;
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("applications").order("desc").collect();
    },
});
