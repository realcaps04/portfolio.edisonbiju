import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    planId: v.string(),
    planName: v.string(),
    currency: v.string(),
    priceUsd: v.number(),
    priceInr: v.number(),
    displayedPrice: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const planId = args.planId.trim();
    const planName = args.planName.trim();
    const currency = args.currency.trim().toUpperCase();
    const displayedPrice = args.displayedPrice.trim();
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone.trim();
    const company = args.company?.trim() ?? "";
    const message = args.message.trim();

    if (!planId || !planName || !name || !email || !phone || !message) {
      throw new Error("Name, email, phone, and a short message are required.");
    }

    if (currency !== "USD" && currency !== "INR") {
      throw new Error("Choose a valid currency.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    if (
      planId.length > 80 ||
      planName.length > 160 ||
      displayedPrice.length > 80 ||
      name.length > 120 ||
      company.length > 160 ||
      message.length > 4000 ||
      phone.length > 40
    ) {
      throw new Error("One of the fields is too long.");
    }

    return await ctx.db.insert("planInquiries", {
      planId,
      planName,
      currency,
      priceUsd: args.priceUsd,
      priceInr: args.priceInr,
      displayedPrice,
      name,
      email,
      phone,
      company,
      message,
      createdAt: Date.now(),
    });
  },
});
