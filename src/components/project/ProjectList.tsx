import { useQuery } from "@tanstack/react-query";
import { CategoryItem, CategoryItems } from "components/about/CategoryItem";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProjectList } from "utils/api";
import { IWorksArray } from "utils/interface";
import { worksData } from "utils/worksData";
import DummyProjectItem from "./DummyProjectItem";
import ProjectItem from "./ProjectItem";

const LeftContainer = styled.div`
  width: 22%;
  background: ${(props) => props.theme.blue};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    height: 60px;
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            &:not(:last-of-type){
                margin-right: 10px;
            }
        }
    }
  }

  @media screen and (max-width: 690px) {
    width: 100%;
    height: 90px;
  }

  @media screen and (max-width: 370px) {
    width: 100%;
    height: 120px;
  }
  
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(-50deg, transparent, rgba(222, 222, 222, 0.5) );
  }
`;

const RightContainer = styled.div`
    width: 78%;
    flex: 1;
    overflow-y: auto;
    padding: 30px 30px max(3.75vw, 32px);
    h1{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .notion{
            margin-right: 10px;
            width: 25px;
            height: 25px;
            background: center/ contain no-repeat url('/assets/img/notion.webp');
        }
    }
    .desc{
        margin-bottom: 20px;
        font-size: 14px;
        font-style: normal;
        line-height: 1.43;
        white-space: pre-line;
        text-align: start;
        word-break: break-all;
        color: #878e98;
    }
    ul{
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 2.5rem 1rem;
        margin: 0 auto;
        li{
            display: block;
            .mark{
                width: 100%;
                height: 120px;
                background: #5c5ca1;
                border-radius: 6px;
                border: solid 1px #f2f4f6;
                font-size: 22px;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }

            .text{
                margin-top: 10px;
                h3{
                    font-size: 16px;
                    line-height: 135%;
                    font-weight: 500;
                    margin-bottom: 13px;
                }
                .keywords{
                    flex-wrap: wrap;
                    display: flex;
                    gap: 0 0.5rem;
                    margin-bottom: 10px;
                    span{
                        font-size: 14px;
                        font-style: normal;
                        line-height: 1.43;
                        white-space: pre-line;
                        text-align: start;
                        word-break: break-all;
                        color: #878e98;
                    }
                }
                .company{
                    font-size: 14px;
                    line-height: 1.43;
                }
            }
            &.dummy{
                .text{
                    h3{
                        width: 100%;
                        height: 1rem;
                        background: #dadafa;
                        border-radius: 25px;
                    }
                    .keywords{
                        span{
                            width: 4rem;
                            height: 1rem;
                            background: #e9e9fd;
                            border-radius: 25px;
                        }
                    }
                    .company{
                        width: 5rem;
                        height: 1rem;
                        background: #e9e9fd;
                        border-radius: 25px;
                    }
                }
            }
        }
    }

    &::-webkit-scrollbar{
    width: 10px;
    }
    &::-webkit-scrollbar-thumb {
    background: #484848d5; /* 스크롤바의 색상 */
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
    }

    &::-webkit-scrollbar-track {
    background: transparent /*스크롤바 뒷 배경 색상*/
    }
    @media ${(props) => props.theme.device.tablet} {
        width: 100%;
        padding: 0 20px;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
        padding: 50px 20px max(3.75vw, 32px);
    }
    @media screen and (max-width: 940px){
        ul{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media ${(props) => props.theme.device.mobile}{
        ul{
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
`;


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

    useEffect(()=>{
        console.log(list)
    },[list])

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