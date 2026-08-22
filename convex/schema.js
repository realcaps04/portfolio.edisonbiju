import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  }).index("by_email", ["email"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
    source: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  workInquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    company: v.string(),
    projectType: v.string(),
    budget: v.string(),
    timeline: v.string(),
    details: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  admins: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
  }).index("by_email", ["email"]),

  adminSessions: defineTable({
    adminId: v.id("admins"),
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
