import { query } from "./_generated/server";

const NOTICE_EMAIL = "eb-notice@internal.local";

function toNotice(row) {
  return {
    _id: row._id,
    title: row.title || row.subject || "Notice",
    body: row.body || row.message || "",
    createdAt: row.createdAt ?? row._creationTime,
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const notices = [];

    try {
      const rows = await ctx.db.query("notifications").withIndex("by_createdAt").order("desc").take(40);
      notices.push(...rows.map(toNotice));
    } catch {
      try {
        const rows = await ctx.db.query("notifications").order("desc").take(40);
        notices.push(...rows.map(toNotice));
      } catch {
        /* table not available yet */
      }
    }

    try {
      const messages = await ctx.db.query("messages").order("desc").take(80);
      notices.push(
        ...messages
          .filter((row) => (row.email || "").toLowerCase() === NOTICE_EMAIL)
          .map(toNotice),
      );
    } catch {
      /* ignore */
    }

    const seen = new Set();
    return notices
      .filter((row) => {
        if (seen.has(row._id)) return false;
        seen.add(row._id);
        return true;
      })
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      .slice(0, 40);
  },
});
