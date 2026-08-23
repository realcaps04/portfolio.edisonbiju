import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("notifications").withIndex("by_createdAt").order("desc").take(40);
    return rows.map((row) => ({
      _id: row._id,
      title: row.title,
      body: row.body,
      createdAt: row.createdAt ?? row._creationTime,
    }));
  },
});
