import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    reviews: defineTable({
        name: v.string(),
        company: v.string(),
        country: v.string(),
        rating: v.number(),
        comment: v.string(),
        image_url: v.optional(v.string()),
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
        createdAt: v.string(),
    }),
    applications: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        position: v.string(),
        message: v.string(),
        cv_url: v.string(),
        createdAt: v.string(),
    }),
    clients: defineTable({
        name: v.string(),
        company: v.string(),
        email: v.string(),
        phone: v.string(),
        product: v.string(),
        volume: v.string(),
        incoterms: v.string(),
        destination: v.string(),
        message: v.string(),
        createdAt: v.string(),
    }),
});
