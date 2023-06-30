import styled from "styled-components";
import WindowModal from "components/WindowModal";
import ProjectSwiper from "components/project/ProjectSwiper";

const Wrapper = styled.div`
  overflow: hidden;
  padding-top: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  @media ${(props) => props.theme.device.tablet} {
    overflow-y: scroll;
    padding-top: 50px;
    padding-bottom: 50px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
  }
`;

const Project = () => {
  return (
    <WindowModal bgColor="#fafafa">
      <Wrapper>
        {/* <ProjectCarousel /> */}
        <ProjectSwiper/>
      </Wrapper>
    </WindowModal>
  );
};

export default Project;
