import { ConvexReactClient } from "convex/react";

const convexUrl =
  import.meta.env.VITE_CONVEX_URL || "https://precious-meerkat-192.convex.cloud";

export const convex = new ConvexReactClient(convexUrl);
export const convexSiteUrl =
  import.meta.env.VITE_CONVEX_SITE_URL || "https://precious-meerkat-192.convex.site";
