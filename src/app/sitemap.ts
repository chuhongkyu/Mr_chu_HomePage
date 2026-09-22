import { MetadataRoute } from "next";

import { SITE_URL as BASE_URL } from "@/constants/site";
import { getAllProjectList } from "@/utils/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProjects = await getAllProjectList();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/game`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = allProjects.pageIds.map(
    (projectId: string) => ({
      url: `${BASE_URL}/project/${projectId}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })
  );

  return [...mainPages, ...projectPages];
}
