import { IList, ProjectListResponse } from "@/components/common/window/searchFrom/SearchType";
import type { QueryFunctionContext } from "@tanstack/react-query";

export interface IDetail {
    id?: string;
}


// React Query가 queryFn을 실행하면서 context를 넘깁니다.
// context.queryKey에는 [string, string?] 형태로 쿼리 키가 들어옵니다.
const getProjectList = async (
  context: QueryFunctionContext<readonly unknown[]>
): Promise<ProjectListResponse | null> => {
    const [_key, debouncedValue] = context.queryKey as [string, string?];
  
    let url = 'https://developed-heath-mr-chu.koyeb.app/api/notion/projectList';
    if (debouncedValue) {
        url += `?keyword=${debouncedValue}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("프로젝트 리스트를 가져오지 못했습니다.");
    return response.json();
};


const getProjectDetail = async ({id}:IDetail) => {
    const url = `https://notion-api.splitbee.io/v1/page/${id}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('프로젝트 상세 정보를 불러오는 데 실패했습니다.');
        }
    
        const data = await response.json();
        // console.log('data',data);
        return data;

    } catch (error) {
        console.error('에러:', error);
        return null;
    }
};

//ssg 때문에 25.05.30 전체 ID LIST 함수 추가함.
const getAllProjectList = async () => {
    const url = 'https://developed-heath-mr-chu.koyeb.app/api/notion/pageIds';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('프로젝트 리스트 정보를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('에러:', error);
        return null;
    }
}

export { getProjectList, getProjectDetail, getAllProjectList };
  
