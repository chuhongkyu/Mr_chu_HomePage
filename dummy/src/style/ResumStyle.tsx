import styled from "styled-components";

const MainContainer = styled.div`
  width: 75%;
  height: 100%;
  padding: max(2.6042vw, 50px) max(1.5625vw, 20px) max(2.6042vw, 30px);
  background-color: rgb(242, 242, 242);
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom-right-radius: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  letter-spacing: -0.03em;
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5; /* 스크롤바의 색상 */
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent /*스크롤바 뒷 배경 색상*/
  }
  h1{
    font-family: ${(props) => props.theme.fontFamily.Montserrat} ;
    margin-bottom: max(1.2500vw, 1.5px);
  }
  @media ${(props) => props.theme.device.mac} {
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
  }
`;

const ProfileGrid = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 1rem;
  /* margin-bottom: max(1.2500vw, 1.5px); */
  .between {
    display: flex;
    justify-content: space-between;
    line-height: 135%;
    &:not(:last-of-type){
      margin-bottom: 3px;
    }
    p{
      &:first-of-type{
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
        word-wrap: break-word;
      }
      &:last-of-type{
        display: block;
        white-space: nowrap;
      }
      
    }
    img {
      height: 25px;
    }
  }
  hr {
    height:1px;
    border:0;
    background-color: #e2e2e2;
    margin: 10px 0px;
  }
  @media ${(props) => props.theme.device.mac} {
    gap: 10px;
    .between {
      display: flex;
      justify-content: space-between;
      img {
        height: 20px;
      }
    }
    hr {
      margin: 5px 0px;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: 1fr;
    gap: 7px;
    .between {
      img {
        height: 18px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 6px;
    .between {
      img {
        height: 15px;
      }
    }
  }
`;


export { MainContainer, ProfileGrid };