import styled from "styled-components";

const App = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
  }
  p {
  }
`;

const AppLink = ({ title, img }) => {
  return (
    <App>
      <img src={img} alt={title} />
      <p>{title}</p>
    </App>
  );
};

export default AppLink;
