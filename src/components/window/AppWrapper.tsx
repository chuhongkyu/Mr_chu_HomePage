import { appList } from "atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AppLink from "components/window/AppLink";
import AddAppBtn from "./AddAppBtn";

const Wrapper = styled.div`
  margin-top: 25rem;
  position: fixed;
  @media ${(props) => props.theme.device.tablet} {
    margin-top: 30rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-top: 22rem;
  }
`

const AppContainer = styled.div`
  width: max(40vw, 680px);
  min-height: 14rem;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: 1fr 1fr;
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    min-height: 20rem;
  }
  @media screen and (max-width: 355px){
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const AppWrapper = ()=> {
    const apps = useRecoilValue(appList);
    return(
      <Wrapper>
        <AppContainer>
        {apps.map((app, index) => (
          <AppLink key={index + "link-KEY"} title={app} pathUrl={`${app}`} type={app} />
          ))
        }
        </AppContainer>
        <AddAppBtn/>
      </Wrapper>
    )
}

export default AppWrapper;