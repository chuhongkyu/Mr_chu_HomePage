interface IList {
    keyword?: string;
}
  
const getProjectList = ({ keyword }: IList = {}) => {
    let url = 'http://localhost:3000/api/get/projectList';
    if (keyword) {
        url += `?keyword=${keyword}`;
    }

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log('error', error);
            return null;
        });
};

export { getProjectList };
  
