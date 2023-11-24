import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: var(--100vh, 100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h5{
      font-size: 32px;
      letter-spacing: -0.05em;
  }
  a{
      margin-top: 1rem;
      border-radius: 25px;
      background: #fff;
      padding: 5px 10px 6px;
      font-size: 25px;
      &:hover{
        transition: 300ms;
        background: #000;
        color: #fff;
      }
  }
  @media ${(props) => props.theme.device.tablet} {
  }
  @media ${(props) => props.theme.device.mobile} {
  }
`;

const NotFound = () =>{
    return (
        <Wrapper>
            <h5>Not Found</h5>
            <Link to="/home">Go home</Link>
        </Wrapper>
    )
}


export default NotFound;