import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: flex-start;
  h1 {
    font-size: 50px;
    color: white;
    font-weight: 800;
    white-space: nowrap;
  }
`;

const Title = () => {
  const [text, setText] = useState([]);
  const [blink, setBlink] = useState(false);
  const textArr = "Welcome to Mr. Chu's Homepage";
  const textArrS = textArr.split("");
  let copyArr = [];
  useEffect(() => {
    const makeText = (newArr) => {
      if (newArr.length > 0) {
        copyArr += newArr.shift();
        setText(copyArr);
        setTimeout(() => makeText(newArr), 80);
      } else {
        // console.log("end");
        return clearTimeout();
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
