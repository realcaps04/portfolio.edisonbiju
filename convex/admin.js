import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_NAME = "Edison Biju";
const DEFAULT_EMAIL = "edisonbiju45@gmail.com";
const DEFAULT_PASSWORD = "Edison@3455";
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function ensureDefaultAdmin(ctx) {
  const email = DEFAULT_EMAIL.toLowerCase();
  const rows = await ctx.db.query("admins").take(50);
  const existing = rows.find((row) => (row.email || "").toLowerCase() === email) ?? null;
  const fields = {
    name: DEFAULT_NAME,
    email,
    password: DEFAULT_PASSWORD,
  };

  if (existing) {
    await ctx.db.patch(existing._id, fields);
    return existing._id;
  }

  return await ctx.db.insert("admins", fields);
}

async function requireSession(ctx, token) {
  const sessions = await ctx.db.query("adminSessions").take(100);
  const session = sessions.find((row) => row.token === token) ?? null;

  if (!session || session.expiresAt < Date.now()) {
    if (session) await ctx.db.delete(session._id);
    throw new Error("Session expired. Sign in again.");
  }

  const admin = await ctx.db.get(session.adminId);
  if (!admin) {
    await ctx.db.delete(session._id);
    throw new Error("Invalid session.");
  }

  return { session, admin };
}

function stamp(doc) {
  return {
    ...doc,
    createdAt: doc.createdAt ?? doc._creationTime,
  };
}

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const id = await ensureDefaultAdmin(ctx);
    return { id, email: DEFAULT_EMAIL };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ensureDefaultAdmin(ctx);
    const admin = await ctx.db.get(id);
    const email = args.email.trim().toLowerCase();

    if (!admin || admin.email !== email || admin.password !== args.password) {
      throw new Error("Invalid email or password.");
    }

    const token = randomToken();
    await ctx.db.insert("adminSessions", {
      adminId: admin._id,
      token,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_MS,
    });

    return { token, email: admin.email };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db.query("adminSessions").take(100);
    const session = sessions.find((row) => row.token === args.token);
    if (session) await ctx.db.delete(session._id);
  },
});

export const verify = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const { admin } = await requireSession(ctx, args.token);
    return { ok: true, email: admin.email };
  },
});

export const inbox = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);

    const [contacts, workInquiries, messages] = await Promise.all([
      ctx.db.query("contacts").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("workInquiries").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("messages").order("desc").take(300),
    ]);

    return {
      contacts: contacts.map(stamp),
      workInquiries: workInquiries.map(stamp),
      messages: messages.map(stamp),
      counts: {
        contacts: contacts.length,
        workInquiries: workInquiries.length,
        messages: messages.length,
      },
    };
  },
});

export const removeContact = mutation({
  args: { token: v.string(), id: v.id("contacts") },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const removeWorkInquiry = mutation({
  args: { token: v.string(), id: v.id("workInquiries") },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const removeMessage = mutation({
  args: { token: v.string(), id: v.id("messages") },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
