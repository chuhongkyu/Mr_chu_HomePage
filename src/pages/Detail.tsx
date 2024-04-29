import WindowModal from "components/WindowModal";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { BlockMapType, NotionRenderer } from 'react-notion';
import Loading from "components/Loading";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  padding-top: 50px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
  @media ${(props) => props.theme.device.tablet} {
    padding-top: 50px;
    padding-bottom: 50px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
  }
`;

const NotionWrapper = styled.div`
  max-width: 1024px;
  @media ${(props) => props.theme.device.tablet} {
    padding: 0 2rem;
    width: 100%;
  }
  @media ${(props) => props.theme.device.mobile} {
    max-width: 680px;
    width: 100%;
  }
  p,b,li,h1,h5{
    font-family: 'Noto Sans KR', sans-serif;
  }
`;


export const NotionPage = ( notionData : BlockMapType) => {
  return (
      <NotionRenderer blockMap={notionData} />
  );
};


const Detail = () => {
  const data = useLoaderData() as BlockMapType
  const [projectDetail, setProjectDetail] = useState<BlockMapType | null>(data);
  useEffect(()=>{
    if(data) setProjectDetail(data)
  },[data])

  return (
    <WindowModal bgColor="#fafafa">
      <Wrapper>
        {projectDetail ? 
        <NotionWrapper>
          <NotionRenderer blockMap={projectDetail} />
        </NotionWrapper>
        : <Loading/>}
      </Wrapper>
    </WindowModal>
  );
};
  
export default Detail;