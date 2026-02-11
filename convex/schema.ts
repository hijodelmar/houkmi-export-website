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
});
