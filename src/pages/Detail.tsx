import WindowModal from "components/WindowModal";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProjectDetail } from "utils/api";

const Wrapper = styled.div`
  overflow: hidden;
  padding-top: 30px;
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

const H5 = styled.h5`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 135%;
`


const Detail = () => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState<any | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getProjectDetail({ id });
        if (data) {
          setProjectDetail(data.project);
        }
      } catch (error) {
        console.error('프로젝트 상세 정보를 불러오는 데 에러 발생:', error);
      }
    };

    fetchData();
  },[id])

  useEffect(()=>{ console.log(projectDetail)},[projectDetail])

    return (
      <WindowModal bgColor="#fafafa">
        <Wrapper>
          <Suspense fallback={null}>
            <H5></H5>
          </Suspense>
        </Wrapper>
      </WindowModal>
    );
};
  
export default Detail;