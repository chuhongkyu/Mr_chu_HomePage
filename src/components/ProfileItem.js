import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px 30px 20px;
  white-space: nowrap;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  .icon {
    width: 25px;
    margin-right: 10px;
  }
  h3 {
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  @media ${(props) => props.theme.device.tablet} {
    h3 {
      font-size: 20px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    margin: 20px 0px;
    .icon {
      width: 20px;
      margin-right: 10px;
    }
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 11px;
    }
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 20px 20px 30px 20px;
    .icon {
      width: 25px;
      margin-right: 10px;
    }
    h3 {
      font-size: 25px;
      margin-bottom: 10px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
  }
`;

const Container = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  @media ${(props) => props.theme.device.mobile} {
    margin-left: 0px;
    margin-right: 0px;
  }
  @media ${(props) => props.theme.device.mac} {
    margin-left: 40px;
    margin-right: 40px;
  }
`;

function ProfileItem({ title, children, icon, column, row }) {
  return (
    <Wrapper style={{ gridColumn: column, gridRow: row }}>
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
