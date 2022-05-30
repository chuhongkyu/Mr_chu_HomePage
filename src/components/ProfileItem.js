import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-size: 25px;
  }
`;

function ProfileItem() {
  return (
    <Wrapper>
      <h1>Education</h1>
      <div>
        <p>중앙대학교 미술학부 한국화</p>
        <p>2012~2018</p>
      </div>
    </Wrapper>
  );
}

export default ProfileItem;
