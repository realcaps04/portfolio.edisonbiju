import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const http = httpRouter();

http.route({
  path: "/contact",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      await ctx.runMutation(api.messages.submit, {
        name: String(body.name ?? ""),
        email: String(body.email ?? ""),
        subject: String(body.subject ?? ""),
        message: String(body.message ?? ""),
      });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
    } catch (error) {
      return new Response(
        JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Could not send message." }),
        { status: 400, headers: cors },
      );
    }
  }),
});

http.route({
  path: "/contact",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

export default http;
