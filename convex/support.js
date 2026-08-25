import { mutation } from "./_generated/server";
import { v } from "convex/values";

const PRODUCTS = new Set(["cloak", "portfolio", "free-tools", "builds", "other"]);
const CATEGORIES = new Set(["bug", "account", "billing", "feature", "other"]);

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    product: v.string(),
    category: v.string(),
    subject: v.string(),
    message: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone?.trim() ?? "";
    const product = args.product.trim().toLowerCase();
    const category = args.category.trim().toLowerCase();
    const subject = args.subject.trim();
    const message = args.message.trim();
    const source = args.source?.trim() || "support-page";

    if (!name || !email || !subject || !message) {
      throw new Error("Name, email, subject, and message are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    if (!PRODUCTS.has(product)) {
      throw new Error("Choose a valid product.");
    }

    if (!CATEGORIES.has(category)) {
      throw new Error("Choose a valid category.");
    }

    if (
      name.length > 120 ||
      subject.length > 160 ||
      message.length > 4000 ||
      phone.length > 40
    ) {
      throw new Error("One of the fields is too long.");
    }

    if (subject.length < 4) {
      throw new Error("Subject is too short.");
    }

    if (message.length < 10) {
      throw new Error("Describe the issue in a bit more detail.");
    }

    const now = Date.now();
    return await ctx.db.insert("supportTickets", {
      name,
      email,
      phone,
      product,
      category,
      subject,
      message,
      status: "open",
      source,
      createdAt: now,
      updatedAt: now,
    });
  },
});
