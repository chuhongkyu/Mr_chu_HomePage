import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Item = ({ imgSrc, name, wSize }) => {
  return (
    <Container>
      <img style={{ width: wSize }} src={env.PUBLIC_URL + imgSrc} alt={name} />
    </Container>
  );
};

export default Item;
