import type { MetadataRoute } from "next";
import { clinic } from "@/config/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: clinic.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
