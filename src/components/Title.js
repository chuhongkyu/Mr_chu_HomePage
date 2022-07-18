import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;
  h1 {
    font-size: 50px;
    color: white;
    font-weight: 800;
    white-space: nowrap;
  }
  @media ${(props) => props.theme.device.tablet} {
    h1 {
      font-size: 30px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    h1 {
      font-size: 20px;
    }
  }
`;

const textArr = "Welcome to Mr. Chu's Homepage";
const textArrS = textArr.split("");
let copyArr = [];

const Title = () => {
  const [text, setText] = useState([]);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const makeText = (newArr) => {
      if (newArr.length > 0) {
        copyArr += newArr.shift();
        setText(copyArr);
        setTimeout(() => makeText(newArr), 80);
      } else {
        return clearTimeout();
      }
    };
    makeText(textArrS);
  }, []);
  useEffect(() => {
    const showblink = () => {
      setBlink(!blink);
    };
    setTimeout(showblink, 600);
  }, [blink]);
  return (
    <Wrapper>
      <h1>
        {text}
        {blink ? "|" : null}
      </h1>
    </Wrapper>
  );
};

export default Title;
