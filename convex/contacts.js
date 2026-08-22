import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone?.trim() ?? "";
    const subject = args.subject.trim();
    const message = args.message.trim();
    const source = args.source?.trim() || "popup";

    if (!name || !email || !subject || !message) {
      throw new Error("Name, email, subject, and message are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    if (name.length > 120 || subject.length > 160 || message.length > 4000 || phone.length > 40) {
      throw new Error("One of the fields is too long.");
    }

    return await ctx.db.insert("contacts", {
      name,
      email,
      phone,
      subject,
      message,
      source,
      createdAt: Date.now(),
    });
  },
});
