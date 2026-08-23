import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    productId: v.string(),
    productTitle: v.string(),
    productUrl: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const productId = args.productId.trim();
    const productTitle = args.productTitle.trim();
    const productUrl = args.productUrl?.trim() ?? "";
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone?.trim() ?? "";
    const company = args.company?.trim() ?? "";
    const budget = args.budget?.trim() ?? "";
    const message = args.message.trim();

    if (!productId || !productTitle || !name || !email || !phone || !message) {
      throw new Error("Name, email, phone, and a short message are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    if (
      productId.length > 80 ||
      productTitle.length > 160 ||
      productUrl.length > 300 ||
      name.length > 120 ||
      company.length > 160 ||
      message.length > 4000 ||
      phone.length > 40 ||
      budget.length > 80
    ) {
      throw new Error("One of the fields is too long.");
    }

    return await ctx.db.insert("buildInquiries", {
      productId,
      productTitle,
      productUrl,
      name,
      email,
      phone,
      company,
      budget,
      message,
      createdAt: Date.now(),
    });
  },
});
