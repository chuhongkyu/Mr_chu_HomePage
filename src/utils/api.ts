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
      return data;

    } catch (error) {
      console.error('에러:', error);
      return null;
    }
};

export { getProjectList, getProjectDetail };
  
