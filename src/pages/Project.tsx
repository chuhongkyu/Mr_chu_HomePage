import styled from "styled-components";
import WindowModal from "components/WindowModal";
import ProjectSwiper from "components/project/ProjectSwiper";

const Title = styled.h1`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  white-space: nowrap;
  font-size: 35px;
  font-weight: 800;
  margin: 0 1rem 1rem;
  img {
    width: 25px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  padding: 50px 0px 50px;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const Project = () => {
  return (
    <WindowModal bgColor="#fafafa">
      <Title>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4a1.svg"
            alt="아이디어"
          />
          MY PROJECTS
      </Title>
      <Wrapper>
        {/* <ProjectCarousel /> */}
        <ProjectSwiper/>
      </Wrapper>
    </WindowModal>
  );
};

export default Project;
