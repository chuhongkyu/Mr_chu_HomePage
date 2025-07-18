export interface IDetail {
    id?: string;
}

const getProjectList = ({ queryKey }: any) => {
    const [_key, debouncedValue] = queryKey

    let url = 'https://developed-heath-mr-chu.koyeb.app/api/notion/projectList';
    if (debouncedValue) {
        url += `?keyword=${debouncedValue}`;
    }

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            return data;
        })
        .catch((error) => {
            console.log('error', error);
            return null;
        });
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
  
