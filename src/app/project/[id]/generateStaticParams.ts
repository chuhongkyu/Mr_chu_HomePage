import { getAllProjectList } from "@/utils/api";

export async function generateStaticParams() {
    const allProjects = await getAllProjectList();
    
    return allProjects.pageIds.map((id: string) => ({
        id: id,
    }));
}