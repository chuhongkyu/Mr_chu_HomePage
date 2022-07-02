import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  grid-column: span 1;
  h3 {
    font-size: 25px;
    margin-bottom: 30px;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  @media ${(props) => props.theme.device.mobile} {
    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    @media ${(props) => props.theme.device.mobile} {
      h3 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      p {
        font-size: 11px;
      }
    }
  }
`;

function ProfileItem({ title, children }) {
  return (
    <Wrapper>
      <h3>{title}</h3>
      {children}
    </Wrapper>
  );
}

export default ProfileItem;
