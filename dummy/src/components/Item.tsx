import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

interface Iitem {
  imgSrc: string;
  name: string;
  wSize: string;
}

const Item = ({ imgSrc, name, wSize }: Iitem) => {
  return (
    <Container>
      <img style={{ width: wSize }} src={imgSrc} alt={name} />
    </Container>
  );
};

export default Item;
