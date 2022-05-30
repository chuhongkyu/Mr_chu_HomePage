import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  grid-column: span 1;
  h1 {
    font-size: 25px;
    margin-bottom: 30px;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
`;

function ProfileItem({ title, children }) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
}

export default ProfileItem;
