import styled from "styled-components";
import WindowBar from "components/WindowBar";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import { getParam } from "utils/helper";
import { Suspense, useEffect, useState } from "react";
import AppWrapper from "components/window/AppWrapper";
import { useMediaQuery } from "react-responsive";
import SearchForm from "components/window/SearchForm";
import Loading from "components/Loading";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: var(--100vh, 100vh);
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  @media ${(props) => props.theme.device.tablet} {

  }
`;

const AnimatedOutlet = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

const Home = () => {
  const [coach, setCoach] = useState<string|boolean|null>()
  const location  = useLocation()
  const isMoible = useMediaQuery({
    query: '(min-width: 681px)'
  })


  useEffect(() => {
    const state = getParam('test');
    setCoach(state)
    if(coach){
      window.document.body.classList.add('coach');
    }else{
      window.document.body.classList.remove('coach');
    }
  }, [coach])

  return (
      <Wrapper>
          <Window>
            <SearchForm/>
            <AppWrapper/>
          </Window>
          <Suspense fallback={<Loading/>}>
            <AnimatePresence initial={false}>
              <AnimatedOutlet key={location.pathname} />
            </AnimatePresence>
          </Suspense>
          {isMoible ? <WindowBar/> : null}
      </Wrapper>
  );
};

export default Home;
