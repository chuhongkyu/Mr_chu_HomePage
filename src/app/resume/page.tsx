import ModalLeftContainer from "@/components/common/page/layout/ModalLeftContainer";
import ModalRightContainer from "@/components/common/page/layout/ModalRightContainer";
import CareerContainer from "@/components/resume/CareerContainer";
import ProfileContainer from "@/components/resume/ProfileContainer";
import styles from "@/style/sub-page.module.scss";


const ResumePage = () => {
    return (
        <>
            <ModalLeftContainer>
                <ProfileContainer/>
            </ModalLeftContainer>
            <ModalRightContainer>
                <h1 className={styles["title"]}>✏️ RESUME</h1>
                <CareerContainer/>
            </ModalRightContainer>
        </>
    )
}

export default ResumePage;