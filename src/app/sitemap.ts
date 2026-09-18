import type { MetadataRoute } from "next";

import { getDocGroups } from "@/lib/docs";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getDocGroups().flatMap((group) => group.items);

  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${siteUrl}${doc.url}`,
    lastModified: new Date("2026-07-09"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date("2026-07-09"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docRoutes,
  ];
}