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

const textArr = [
  "Welcome to Mr. Chu's Homepage",
  "환영합니다! 여러분 😄",
  "이곳은 프론트 엔드 홈페이지 입니다.",
  "개발자 화이팅! 👍👍",
];

let copyArr = [];

const Title = () => {
  const [randText, setRandomText] = useState([]);
  const [text, setText] = useState();
  const [check, setCheck] = useState(false);
  const [blink, setBlink] = useState(false);

  const randomNumber = (random) => {
    const randomType = Math.floor(Math.random() * random.length);
    setRandomText(textArr[randomType].split(""));
  };

  const makeText = (newArr) => {
    if (newArr.length > 0) {
      copyArr += newArr.shift();
      setText(copyArr);
      setTimeout(() => makeText(newArr), 80);
    } else {
      copyArr = [];
      setCheck(!check)
    }
  };

  useEffect(() => {
    const timer = setTimeout(()=>{ setText([]); randomNumber(textArr);}, 700)
    return ()=> clearTimeout(timer)
  }, [check]);
  
  useEffect(() => {
    makeText(randText);
  }, [randText]);

  useEffect(() => {
    const showBlink = setTimeout(() => setBlink(!blink), 600);
    return () => clearTimeout(showBlink);
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
