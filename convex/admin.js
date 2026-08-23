import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

const DEFAULT_NAME = "Edison Biju";
const DEFAULT_EMAIL = "edisonbiju45@gmail.com";
const DEFAULT_PASSWORD = "Edison@3455";
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;
const HASH_PREFIX = "sha256";

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(size = 16) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

function randomToken() {
  return randomHex(32);
}

function isHashedPassword(value) {
  const parts = String(value || "").split("$");
  return parts.length === 3 && parts[0] === HASH_PREFIX && parts[1].length === 32 && parts[2].length === 64;
}

async function hashPassword(password, saltHex) {
  const encoded = new TextEncoder().encode(`${saltHex}:${password}:eb-admin`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(digest);
}

async function hashNewPassword(password) {
  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);
  return `${HASH_PREFIX}$${salt}$${hash}`;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function passwordsMatch(stored, incoming) {
  if (isHashedPassword(stored)) {
    const [, salt, expected] = stored.split("$");
    const actual = await hashPassword(incoming, salt);
    return timingSafeEqual(actual, expected);
  }
  return stored === incoming;
}

async function ensureDefaultAdmin(ctx) {
  const email = DEFAULT_EMAIL.toLowerCase();
  const rows = await ctx.db.query("admins").take(50);
  const existing = rows.find((row) => (row.email || "").toLowerCase() === email) ?? null;

  if (existing) {
    const updates = { name: DEFAULT_NAME, email };
    if (!isHashedPassword(existing.password)) {
      updates.password = await hashNewPassword(existing.password || DEFAULT_PASSWORD);
    }
    await ctx.db.patch(existing._id, updates);
    return existing._id;
  }

  return await ctx.db.insert("admins", {
    name: DEFAULT_NAME,
    email,
    password: await hashNewPassword(DEFAULT_PASSWORD),
  });
}

function fail(message) {
  throw new ConvexError(message);
}

const NOTICE_EMAIL = "eb-notice@internal.local";

function isNoticeMessage(doc) {
  return (doc.email || "").toLowerCase() === NOTICE_EMAIL;
}

function asNotice(doc) {
  return {
    ...doc,
    title: doc.title || doc.subject || "Notice",
    body: doc.body || doc.message || "",
    createdAt: doc.createdAt ?? doc._creationTime,
  };
}

async function requireSession(ctx, token) {
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q) => q.eq("token", String(token || "").trim()))
    .first();

  if (!session || session.expiresAt < Date.now()) {
    if (session) await ctx.db.delete(session._id);
    fail("Session expired. Sign in again.");
  }

  const admin = await ctx.db.get(session.adminId);
  if (!admin) {
    await ctx.db.delete(session._id);
    fail("Invalid session.");
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

    if (!admin || admin.email !== email || !(await passwordsMatch(admin.password, args.password))) {
      fail("Invalid email or password.");
    }

    if (!isHashedPassword(admin.password)) {
      await ctx.db.patch(admin._id, { password: await hashNewPassword(args.password) });
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
    const sessions = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .collect();
    await Promise.all(sessions.map((session) => ctx.db.delete(session._id)));
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

    const [contacts, workInquiries, buildInquiries, planInquiries, allMessages] = await Promise.all([
      ctx.db.query("contacts").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("workInquiries").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("buildInquiries").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("planInquiries").withIndex("by_createdAt").order("desc").take(300),
      ctx.db.query("messages").order("desc").take(300),
    ]);

    const messages = allMessages.filter((row) => !isNoticeMessage(row));
    const noticeMessages = allMessages.filter(isNoticeMessage).map(asNotice);

    let notifications = [];
    try {
      notifications = await ctx.db
        .query("notifications")
        .withIndex("by_createdAt")
        .order("desc")
        .take(300);
    } catch {
      notifications = [];
    }

    const notices = [...notifications.map(asNotice), ...noticeMessages].sort(
      (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
    );

    return {
      contacts: contacts.map(stamp),
      workInquiries: workInquiries.map(stamp),
      buildInquiries: buildInquiries.map(stamp),
      planInquiries: planInquiries.map(stamp),
      messages: messages.map(stamp),
      notifications: notices.map(stamp),
      counts: {
        contacts: contacts.length,
        workInquiries: workInquiries.length,
        buildInquiries: buildInquiries.length,
        planInquiries: planInquiries.length,
        messages: messages.length,
        notifications: notices.length,
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

export const removeBuildInquiry = mutation({
  args: { token: v.string(), id: v.id("buildInquiries") },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const removePlanInquiry = mutation({
  args: { token: v.string(), id: v.id("planInquiries") },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const createNotification = mutation({
  args: {
    token: v.string(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    const title = args.title.trim();
    const body = args.body.trim();
    if (!title || !body) {
      fail("Title and message are required.");
    }
    if (title.length > 160 || body.length > 2000) {
      fail("Keep the title and message shorter.");
    }
    return await ctx.db.insert("notifications", {
      title,
      body,
      createdAt: Date.now(),
    });
  },
});

export const removeNotification = mutation({
  args: { token: v.string(), id: v.union(v.id("notifications"), v.id("messages")) },
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
