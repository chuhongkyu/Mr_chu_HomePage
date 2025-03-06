import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 1.4rem 0 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  .icon {
    width: 22px;
    margin-right: 15px;
  }
  .img-dark{
    filter: brightness(0.4);
    opacity: 0.8;
  }
  h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
    font-family: "Montserrat", sans-serif;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
    padding: 0 1.4rem 0.8rem;
  }
  p {
    font-size: 18px;
    line-height: 135%;
  }
  @media ${(props) => props.theme.device.mac} {
    h3 {
      font-size: 22px;
    }
    p {
      font-size: 16px;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    .icon {
      width: 20px;
      margin-right: 8px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    .icon {
      width: 20px;
      margin-right: 8px;
    }
    p {
      font-size: 12px;
    }
  }
`;

const Container = styled.div`
  overflow-y: hidden;
  padding: 0 1.4rem 0.8rem;
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
        <img className="icon" src={icon} alt={title} />
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
