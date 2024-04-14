import styled from "styled-components";
import WindowModal from "components/WindowModal";
import ProjectList from "components/project/ProjectList";
import { Suspense } from "react";
import Loading from "components/Loading";

const Wrapper = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 10px;
  position: relative;
  display: flex;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${(props) => props.theme.device.tablet} {
    padding-top: 40px;
    flex-direction: column;
  }
`;

const Project = () => {
  return (
    <WindowModal bgColor="#fafafa">
      <Wrapper>
        <Suspense fallback={<Loading/>}>
          <ProjectList/>
        </Suspense>
      </Wrapper>
    </WindowModal>
  );
};

export default Project;
