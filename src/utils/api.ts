const getProjectList = ()=> {
    const url = 'http://localhost:3000/api/get/projectList'
    return(
        fetch(url)
        .then((response) => console.log(response.json()))
        .catch((error)=>{
            console.log('error',error)
            return null
        })
    )
}

export { getProjectList }
