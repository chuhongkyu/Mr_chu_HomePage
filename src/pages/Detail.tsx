import WindowModal from "components/WindowModal";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from 'react-notion';

const Wrapper = styled.div`
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

export const NotionPage = ({ notionData }:any) => {
  return (
      <NotionRenderer blockMap={notionData} />
  );
};


const Detail = () => {
  const { id } = useParams();

  const [projectDetail, setProjectDetail] = useState<any | null>(null);

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

  // useEffect(()=>{ console.log(projectDetail)},[projectDetail])

    return (
      <WindowModal bgColor="#fafafa">
        <Wrapper>
        {projectDetail && (
          <div style={{ maxWidth: 768 }}>
            <NotionRenderer blockMap={projectDetail} />
          </div>
        )}
        </Wrapper>
      </WindowModal>
    );
};
  
export default Detail;