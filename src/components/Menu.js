import styled from "styled-components";
import { motion } from "framer-motion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Container = styled(motion.div)`
  width: 300px;
  height: 100vh;
  background-color: ${(props) => props.theme.black.cloud};
  position: absolute;
  top: 0;
  transform-origin: bottom;
  padding-bottom: 40px;
  display: flex;
  overflow-x: hidden;
  .left_side {
    width: 20%;
    height: 100%;
    display: grid;
    gap: 5px;
    padding: 10px;
    grid-auto-flow: row;
    img {
      width: 80%;
      height: auto;
    }
  }
  .grid_side {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    .grid_tom {
      width: 100%;
      display: grid;
      gap: 2px;
      grid-auto-flow: row;
      margin-top: 20px;
    }
  }
`;

const Item = styled.span`
  width: 100%;
  height: 100%;
  grid-column: span 1;
  background-color: rgb(227, 79, 38);
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px 10px 20px;
  font-size: 11px;
  white-space: nowrap;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const Variants = {
  initial: { opacity: 1 },
  animate: { scaleY: [0, 1] },
};

const Menu = () => {
  return (
    <Container variants={Variants} initial="initial" animate="animate">
      <div className="left_side">
        <span>
          <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
        </span>
      </div>
      <div className="grid_side">
        <div className="grid_tom">
          <Item>Project 폴더를 관람해 주세요.</Item>
          <Item></Item>
          <Item></Item>
          <Item>이력서</Item>
          <Item>
            <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
            이력서
          </Item>
        </div>
        <div className="grid_tom">
          <Item>
            <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
            About
          </Item>
          <Item>
            <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
            About
          </Item>
          <Item>
            <img
              src="https://www.adobe.com/content/dam/shared/images/product-icons/svg/photoshop.svg"
              alt="adobe_photo"
            />
            Adobe Photoshop CC 2022
          </Item>
          <Item>
            <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
            About
          </Item>
          <Item>
            <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
          </Item>
        </div>
      </div>
    </Container>
  );
};

export default Menu;
