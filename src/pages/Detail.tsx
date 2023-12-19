import WindowModal from "components/WindowModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

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
`;


export const NotionPage = ( notionData : BlockMapType) => {
  return (
      <NotionRenderer blockMap={notionData} />
  );
};


const Detail = () => {
  const { id } = useParams();

  const [projectDetail, setProjectDetail] = useState<BlockMapType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${id}`);
        const data = await response.json();
        setProjectDetail(data);
      } catch (error) {
        console.error('프로젝트 상세 정보를 불러오는 데 에러 발생:', error);
      }
    };

    fetchData();
  }, [id]);

    return (
      <WindowModal bgColor="#fafafa">
        <Wrapper>
          {projectDetail ? (
            <NotionWrapper >
              <NotionRenderer blockMap={projectDetail} />
            </NotionWrapper >
          ) : 
          (
          <LoadingWrapper>
            <Loading/>
          </LoadingWrapper>
          )
          } 
        </Wrapper>
      </WindowModal>
    );
};
  
export default Detail;