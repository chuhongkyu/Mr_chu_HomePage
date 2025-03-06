import { useQuery } from "@tanstack/react-query";
import { CategoryItem, CategoryItems } from "components/about/CategoryItem";
import { useEffect, useState } from "react";
import { getProjectList } from "utils/api";
import { IWorksArray } from "utils/interface";
import { worksData } from "utils/worksData";
import DummyProjectItem from "./DummyProjectItem";
import ProjectItem from "./ProjectItem";
import { LeftContainer, RightContainer } from "style/ProjectStyle";


const ProjectList = () => {
    const [ category, setCategory] = useState(worksData);
    const [ keyWord, setKeyWord] = useState<string>()
    const { isPending, data, error } = useQuery({ queryKey: ['list', keyWord], queryFn: getProjectList})

    const [list, setList] = useState<IWorksArray>([])

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        setCategory(
            category.map((el) => (el.id === target.id ? { ...el, active: true } : { ...el, active: false }))
        );
    };

    const onReset = () => {
        setCategory(
            category.map((el) => ({ ...el, active: false }))
        );
        setKeyWord('')
    }

    useEffect(()=>{
        const check = category.findIndex((el) => el.active === true)
        if (check !== -1) {
            setKeyWord(category[check]?.label)
        }
    },[category])

    useEffect(()=>{
        if(data?.project){
            setList(data?.project)
        }
    },[data])

    return(
        <>
            <LeftContainer>
                <CategoryItems>
                <li onClick={onReset} className={`list active`}>전체</li>
                {category.map((item) => (
                    <CategoryItem onClick={onClick} key={item.id} id={item.id} text={item.name} isActive={item.active}/>
                ))}
                </CategoryItems>
            </LeftContainer>
            <RightContainer>
                <h1><span className="notion"/>프로젝트</h1>
                <div className="desc">* 프로젝트를 클릭하시면 관련 글 링크로 이동합니다.</div>
                {isPending  && <DummyProjectItem/>}
                {error && <div>서버 점검중...</div>}
                {data &&
                <ul>
                    {list?.map((el)=>{
                        return(
                            <ProjectItem key={el.id + "KEY"} keywords={el.kws} company={el.company} id={el.id} name={el.projectName}/>
                        )
                    })}
                </ul>}
            </RightContainer>
        </>
    )
}

export default ProjectList;