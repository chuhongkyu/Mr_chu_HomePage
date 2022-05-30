import { Link } from "react-router-dom";
import styled from "styled-components";

const App = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
  transform: ${(props) =>
    props.isActive ? "translateY(-5px)" : "translateY(0)"};
  a {
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
  }
`;

const AppLink = ({ title, img, pathUrl }) => {
  return (
    <App>
      <Link to={pathUrl}>
        <img src={img} alt={title} />
        <p>{title}</p>
      </Link>
    </App>
  );
};

export default AppLink;
