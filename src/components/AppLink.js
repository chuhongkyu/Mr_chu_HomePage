import { Link } from "react-router-dom";
import styled from "styled-components";

const App = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
  width: 60px;
  height: 60px;
  transform: ${(props) =>
    props.isActive ? "translateY(-5px)" : "translateY(0)"};
  a {
    display: flex;
    justify-self: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 45px;
      height: 45px;
      border-radius: 5%;
    }
    p {
      font-size: 12px;
    }
  }
`;

const AppLink = ({ title, img, pathUrl }) => {
  return (
    <App>
      <Link to={`/home/${pathUrl}`}>
        <img src={img} alt={title} />
        <p>{title}</p>
      </Link>
    </App>
  );
};

export default AppLink;
