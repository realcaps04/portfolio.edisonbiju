import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    projectType: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const phone = args.phone?.trim() ?? "";
    const company = args.company?.trim() ?? "";
    const projectType = args.projectType.trim();
    const budget = args.budget?.trim() ?? "";
    const timeline = args.timeline?.trim() ?? "";
    const details = args.details.trim();

    if (!name || !email || !projectType || !details) {
      throw new Error("Name, email, project type, and work details are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.");
    }

    if (
      name.length > 120 ||
      company.length > 160 ||
      details.length > 5000 ||
      phone.length > 40 ||
      projectType.length > 80 ||
      budget.length > 80 ||
      timeline.length > 80
    ) {
      throw new Error("One of the fields is too long.");
    }

    return await ctx.db.insert("workInquiries", {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      details,
      createdAt: Date.now(),
    });
  },
});
