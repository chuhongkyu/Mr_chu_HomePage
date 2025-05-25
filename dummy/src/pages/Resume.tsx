import ProfileItem from "components/resume/ProfileItem";
import WindowModal from "components/WindowModal";
import ProfileContainer from "components/resume/ProfileContainer";
import { MainContainer, ProfileGrid } from "style/ResumStyle";


const Resume = () => {
  return (
    <WindowModal bgColor="white">
      <ProfileContainer/>
      <MainContainer>
        <h1>✏️ RESUME</h1>
        
      </MainContainer>
    </WindowModal>
  );
};

export default Resume;
