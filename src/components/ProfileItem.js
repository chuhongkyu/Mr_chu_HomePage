import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px 30px;
  border-bottom: 2px solid #bebebe;
  white-space: nowrap;
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
`;

const Container = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  @media ${(props) => props.theme.device.mobile} {
    margin-left: 0px;
    margin-right: 0px;
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
