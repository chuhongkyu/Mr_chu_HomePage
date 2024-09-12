import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 30px 40px 45px 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  .icon {
    width: 30px;
    margin-right: 15px;
  }
  .img-dark{
    filter: brightness(0.4);
    opacity: 0.8;
  }
  h3 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 15px;
    padding-bottom: 15px;
    font-family: "Montserrat", sans-serif;
    border-bottom: 1.5px solid #acacacd0;
  }
  p {
    font-size: 25px;
    line-height: 135%;
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 1.5rem 2rem;
    .icon {
      width: 25px;
      margin-right: 10px;
    }
    h3 {
      font-size: 25px;
      margin-bottom: 15px;
      padding-bottom: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    p {
      font-size: 17px;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    padding: 20px;
    .icon {
      width: 22px;
      margin-right: 9px;
    }
    h3 {
      font-size: 20px;
      margin-bottom: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      
    }
    p {
      font-size: 15px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 20px 15px 15px;
    .icon {
      width: 20px;
      margin-right: 8px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
    }
  }
`;

const Container = styled.div`
  overflow-y: hidden;
`;

interface IWorks {
  children: ReactNode;
  title: string;
  icon: string;
  column: string | number;
  row: string;
}

function ProfileItem({ title, children, icon, column, row }: IWorks) {
  return (
    <Wrapper
      style={{ gridColumn: column, gridRow: row }}
      whileHover={{ y: -3 }}
    >
      <h3>
        <img className="icon " src={icon} alt={title} />
        {title}
      </h3>
      <Container>{children}</Container>
    </Wrapper>
  );
}

ProfileItem.defaultProps = {
  column: "span 1",
  row: "span 1",
};

export default ProfileItem;
