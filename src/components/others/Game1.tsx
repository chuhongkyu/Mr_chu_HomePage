
import styled from "styled-components";
import {Swiper, SwiperSlide } from "swiper/react";
import { drawers } from "utils/icons";
import "swiper/css";

const Wrapper = styled.section`
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

const Title = styled.h3`
    font-size: 25px;
    margin-bottom: 20px;    
`

const Description = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
  @media ${(props) => props.theme.device.mobile} {
    
  }
`;

const TextBox = styled.div`
  width: calc(100% - 200px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 30px;
  h5 {
    font-size: 24px;
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
    width: calc(100% - 100px);
    margin-bottom: 10px;
    h5 {
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

const ScreenShot = styled.img`
  display: block;
  width: 100%;
  height: max(9.0278vw, 130px);
`

const Game1 = () => {
    return(
        <Wrapper>
            <Title>1인 개발 프로젝트{" "}<img loading="lazy" alt="Unity" src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"/></Title>
            <p className="small">*재직중/휴업 상태입니다. 스토어에서 앱 비활성화.</p>
            <h5>
                프론트 엔드 공부를 하기 전에 제작했던 유니티 프로그램을 통한 게임
                앱들입니다. 1인 개발 프로젝트로 기획, 개발과 디자인을 했습니다. 구글
                플레이스토어, AppleStore 플랫폼에 배포 했습니다.
            </h5>
            <Description>
              <a href="https://slimeinthedrawer.netlify.app" target="_blank" rel="noreferrer">
                <BigIcon style={{ backgroundImage: `url(/assets/app01.jpg)`,}}/>
              </a>
              <TextBox>
                <h5>서랍속 슬라임</h5>
                <div className="sub_title"><span className="green">캐쥬얼</span></div>
                <div className="sub_title"><span>광고 포함 /</span></div>
                <p>
                  서랍속 슬라임은 레벨이 15까지 있는 단순한 게임입니다. 슬라임들이
                  서로 부딪히지 않게 움직여 제한 시간을 버티면 클리어 입니다.
                  슬라임 캐릭터 마다 움직임과 특징이 존재합니다. 구글 애드몹 보상
                  광고를 통한 수익 방식을 가집니다.
                </p>
              </TextBox>
            </Description>
          <Swiper 
            slidesPerView={2.2}
            spaceBetween={10}
            grabCursor
            breakpoints={{
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              }
              }}>
                {drawers.map((drawer, index) => {
                  return(
                    <SwiperSlide key={index + "Game"}>
                      <ScreenShot src={drawer.imgSrc} alt={drawer.name} />
                    </SwiperSlide>
                  )
                })}
          </Swiper>
        </Wrapper>
    )
}

export default Game1;