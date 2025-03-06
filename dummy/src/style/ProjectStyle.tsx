import styled from "styled-components";

const LeftContainer = styled.div`
  width: 22%;
  background: ${(props) => props.theme.blue};
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    height: 60px;
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            &:not(:last-of-type){
                margin-right: 10px;
            }
        }
    }
  }

  @media screen and (max-width: 690px) {
    width: 100%;
    height: 90px;
  }

  @media screen and (max-width: 370px) {
    width: 100%;
    height: 120px;
  }
  
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(-50deg, transparent, rgba(222, 222, 222, 0.5) );
  }
`;

const RightContainer = styled.div`
    width: 78%;
    flex: 1;
    overflow-y: auto;
    padding: 30px 30px max(3.75vw, 32px);
    h1{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .notion{
            margin-right: 10px;
            width: 25px;
            height: 25px;
            background: center/ contain no-repeat url('/assets/img/notion.webp');
        }
    }
    .desc{
        margin-bottom: 20px;
        font-size: 14px;
        font-style: normal;
        line-height: 1.43;
        white-space: pre-line;
        text-align: start;
        word-break: break-all;
        color: #878e98;
    }
    ul{
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 2.5rem 1rem;
        margin: 0 auto;
        li{
            display: block;
            .mark{
                width: 100%;
                height: 140px;
                background: #5c5ca1;
                border-radius: 6px;
                border: 1px solid #aeaeae;
                font-size: 22px;
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                overflow: hidden;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    &[alt="세대갈등해결게임"]{
                        display: none;
                    }
                }
            }

            .text{
                margin-top: 10px;
                h3{
                    font-size: 16px;
                    line-height: 135%;
                    font-weight: 500;
                    margin-bottom: 13px;
                }
                .keywords{
                    flex-wrap: wrap;
                    display: flex;
                    gap: 0 0.5rem;
                    margin-bottom: 10px;
                    span{
                        font-size: 14px;
                        font-style: normal;
                        line-height: 1.43;
                        white-space: pre-line;
                        text-align: start;
                        word-break: break-all;
                        color: #878e98;
                    }
                }
                .company{
                    font-size: 14px;
                    line-height: 1.43;
                }
            }
            &.dummy{
                .text{
                    h3{
                        width: 100%;
                        height: 1rem;
                        background: #dadafa;
                        border-radius: 25px;
                    }
                    .keywords{
                        span{
                            width: 4rem;
                            height: 1rem;
                            background: #e9e9fd;
                            border-radius: 25px;
                        }
                    }
                    .company{
                        width: 5rem;
                        height: 1rem;
                        background: #e9e9fd;
                        border-radius: 25px;
                    }
                }
            }
        }
    }

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
    @media ${(props) => props.theme.device.tablet} {
        width: 100%;
        padding: 0 20px;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
        padding: 50px 20px max(3.75vw, 32px);
    }
    @media screen and (max-width: 940px){
        ul{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media ${(props) => props.theme.device.mobile}{
        ul{
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
`;

export { LeftContainer, RightContainer }