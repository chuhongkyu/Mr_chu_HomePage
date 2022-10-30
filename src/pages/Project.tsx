import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import ProjectCarousel from "components/ProjectCarousel";

const Title = styled.h1`
  width: 100%;
  white-space: nowrap;
  font-size: 35px;
  font-weight: 800;
  margin: 0 1rem 1rem;
  img {
    width: 25px;
    margin-right: 10px;
  }
`;

const Wrapper = styled.div`
  padding: 50px 0px 50px;
  width: 100%;
  height: 100%;
`;

const Project = () => {
  return (
    <WindowModal bgColor="#fafafa">
      <Wrapper>
        <Title>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4a1.svg"
            alt="아이디어"
          />
          MY PROJECTS
        </Title>
        <ProjectCarousel />
      </Wrapper>
    </WindowModal>
  );
};

export default Project;
