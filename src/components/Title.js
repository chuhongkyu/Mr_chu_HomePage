import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  display: flex;
  h1 {
    font-size: 55px;
    color: white;
    font-weight: 800;
    white-space: nowrap;
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
        // console.log("end");
      }
      //console.log(text);
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
      <h1>{text}</h1>
      {blink ? <h1>|</h1> : null}
    </Wrapper>
  );
};

export default Title;
