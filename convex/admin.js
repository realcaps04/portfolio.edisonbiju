import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_NAME = "Edison Biju";
const DEFAULT_EMAIL = "edisonbiju45@gmail.com";
const DEFAULT_PASSWORD = "Edison@3455";
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(size = 16) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

async function hashPassword(password, saltHex) {
  const encoded = new TextEncoder().encode(`${saltHex}:${password}:eb-admin`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(digest);
}

function hashesMatch(left, right) {
  if (left.length !== right.length) return false;
  let next = 0;
  for (let i = 0; i < left.length; i += 1) {
    next |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return next === 0;
}

async function ensureDefaultAdmin(ctx) {
  const email = DEFAULT_EMAIL.toLowerCase();
  const rows = await ctx.db.query("admins").take(50);
  const existing = rows.find((row) => (row.email || "").toLowerCase() === email) ?? null;

  const salt = existing?.salt || randomHex(16);
  const passwordHash = await hashPassword(DEFAULT_PASSWORD, salt);
  const fields = {
    name: DEFAULT_NAME,
    email,
    salt,
    passwordHash,
    createdAt: existing?.createdAt ?? Date.now(),
  };

  if (existing) {
    await ctx.db.patch(existing._id, fields);
    return existing._id;
  }

  return await ctx.db.insert("admins", fields);
}

async function requireSession(ctx, token) {
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();

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
    const admin = await ctx.db.get(id);
    return { id, email: admin?.email ?? DEFAULT_EMAIL };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ensureDefaultAdmin(ctx);

      const email = args.email.trim().toLowerCase();
      const rows = await ctx.db.query("admins").take(50);
      const admin = rows.find((row) => (row.email || "").toLowerCase() === email) ?? null;

      if (!admin) {
        throw new Error("Invalid email or password.");
      }

      const passwordHash = await hashPassword(args.password, admin.salt);
      if (!hashesMatch(admin.passwordHash, passwordHash)) {
        throw new Error("Invalid email or password.");
      }

      const token = randomHex(32);
      await ctx.db.insert("adminSessions", {
        adminId: admin._id,
        token,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_MS,
      });

      return { token, email: admin.email };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not sign in.";
      if (message === "Invalid email or password.") throw err;
      throw new Error(message);
    }
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
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
