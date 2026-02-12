import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
    args: {
        name: v.string(),
        company: v.string(),
        email: v.string(),
        phone: v.string(),
        product: v.string(),
        volume: v.string(),
        incoterms: v.string(),
        destination: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        const clientId = await ctx.db.insert("clients", {
            ...args,
            createdAt: new Date().toISOString(),
        });
        return clientId;
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("clients").order("desc").collect();
    },
});

export const remove = mutation({
    args: { id: v.id("clients") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
