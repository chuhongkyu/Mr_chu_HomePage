import { getAllProjectList } from "@/utils/api";
import { MetadataRoute } from "next";

const BASE_URL = "https://mr-chu-home-page.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allProjects = await getAllProjectList();
    
    const mainPages = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/resume`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/game`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ];

    const projectPages = allProjects.pageIds.map((projectId: string) => ({
        url: `${BASE_URL}/project/${projectId}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
    }));

    return [...mainPages, ...projectPages];
}