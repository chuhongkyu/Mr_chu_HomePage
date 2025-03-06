import styled from "styled-components";

const MainContainer = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 10px;
  position: relative;
  display: flex;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${(props) => props.theme.device.tablet} {
    padding-top: 40px;
  }
`;

const LeftContainer = styled.div`
  width: 22%;
  background: ${({ color }) => color || 'rgba(238,188,17,0.8)'};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
  picture{
    width: auto;
    height: 100%;
    object-fit: cover;
  }
  img{
    width: auto;
    height: 100%;
    object-fit: cover;
  }
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(-50deg, transparent, rgba(238,188,17,0.5) );
  }
`;

const RightContainer = styled.div`
  width: 78%;
  flex: 1;
  overflow-y: auto;
  padding-bottom: max(3.75vw, 32px);
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5;
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding: 0 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;


export { MainContainer, LeftContainer, RightContainer}