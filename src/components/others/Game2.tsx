
import styled from "styled-components";
import {Swiper, SwiperSlide } from "swiper/react";
import { stickers } from "utils/icons";
import "swiper/css"; 

const Wrapper = styled.section`
    margin-top: max(6.6667vw, 32px);
    padding-bottom: max(6.6667vw, 32px);
    .small {
        color: rgb(150, 150, 150);
        margin-bottom: 10px;
    }
    h5 {
        margin-bottom: 50px;
    }
    .swiper{
        margin-top: 20px;
        width: 100%;
        height: 100%;
    }
  @media ${(props) => props.theme.device.mobile} {
    .small {
      color: rgb(150, 150, 150);
      margin-bottom: 5px;
    }
  }
`

const Description = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const TextBox = styled.div`
  width: calc(100% - 200px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 30px;
  h2 {
    font-size: 32px;
    margin-bottom: 12px;
  }
  .sub_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    .green {
      font-size: 15px;
      padding: 5px 10px;
      border-radius: 15px;
      background-color: rgb(23, 206, 95);
      color: white;
      margin-bottom: 5px;
    }
    span {
      margin-right: 5px;
      font-size: 15px;
      font-weight: bold;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-bottom: 10px;
    width: calc(100% - 100px);
    h2 {
      font-size: 18px;
    }
    .sub_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 5px;
      .green {
        font-size: 10px;
        padding: 5px 10px;
      }
      span {
        font-size: 11px;
      }
    }
  }
`;

const BigIcon = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: ${(prop) => prop.theme.shadow};
  background-size: cover;
  background-position: center;
  &:hover{
    transform: translateY(-5px);
    transition: 300ms;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const GameText = styled.div`
`;

const ScreenShot = styled.img`
  display: block;
  width: 100%;
  height: max(15.6250vw, 300px);
  @media ${(props) => props.theme.device.mobile} {
    height: 200px;
  }
`

const Game2 = () => {
    return(
        <Wrapper>
            <Description>
                <TextBox>
                    <h2>스티커 슬라임</h2>
                    <div className="sub_title"><span className="green">캐쥬얼</span></div>
                    <div className="sub_title"><span>광고 포함 /</span><span>인앱 결제</span></div>
                    <GameText>
                        <p>
                        기존에 유명한 '똥 피하기 게임'에서 아이디어를 얻은 게임입니다.
                        캐릭터들을 스티커로 만들어 2.5D 느낌을 준 것이 특징입니다.
                        캐릭터들마다 하늘에서 떨어지는 물체가 다르고 능력과 스킬이
                        다릅니다. 게임을 하며 얻은 코인으로 캐릭터를 해금할 수 있습니다.
                        물론 보상 광고를 통해 코인을 더 많이 획득할 수 있습니다. 많은
                        유저들이 다운로드를 했으나 유지, 보수를 할 실력이 안되어
                        유지하지 못했습니다.
                        </p>
                    </GameText>
                </TextBox>
                <a href="https://slimeinthedrawer.netlify.app" target="_blank" rel="noreferrer">
                    <BigIcon style={{ backgroundImage: `url(/assets/app02.png)`,}}/>
                </a>
            </Description>
          <Swiper 
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{
              1024: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              456: {
                slidesPerView: 4,
                spaceBetween: 15,
              }
              }}>
                {stickers.map((sticker, index) => {
                  return(
                    <SwiperSlide key={index + "Game"}>
                      <ScreenShot src={sticker.imgSrc} alt={sticker.name} />
                    </SwiperSlide>
                  )
                })}
          </Swiper>
        </Wrapper>
    )
}

export default Game2;