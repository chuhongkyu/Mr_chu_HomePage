import styled from "styled-components";
import Item from "components/Item";
import SliderContainer from "components/gameapp/SliderContainer";
import WindowModal from "components/WindowModal";
import { drawers, stickers } from "utils/icons";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const OnePerson = styled.div`
  width: 100%;
  padding: 70px 50px 0px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  font-family: 'Noto Sans KR', sans-serif;
  h1 {
    font-size: 25px;
    margin-bottom: 20px;
  }
  .small {
    color: rgb(150, 150, 150);
    margin-bottom: 10px;
  }
  h5 {
    margin-bottom: 50px;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 20px 0px 20px;
    h1 {
      font-size: 25px;
      margin-bottom: 10px;
    }
    .small {
      color: rgb(150, 150, 150);
      margin-bottom: 5px;
    }
  }
`;

const GameBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.device.mobile} {
    justify-content: space-around;
  }
`;

const TextBox = styled.div`
  width: 50%;
  height: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 30px;
  h1 {
    font-size: 40px;
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
    h1 {
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
  @media ${(props) => props.theme.device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const GameText = styled.div`
  font-size: 14px;
  @media ${(props) => props.theme.device.mobile} {
    font-size: 11px;
  }
`;

const IconDescription = styled.div`
  width: 100%;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <OnePerson>
        <h1>
          1인 개발 프로젝트{" "}
          <img
            alt="Unity"
            src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
          />
        </h1>
        <p className="small">
          *재직중/휴업 상태입니다. 스토어에서 앱 비활성화.
        </p>
        <h5>
          프론트 엔드 공부를 하기 전에 제작했던 유니티 프로그램을 통한 게임
          앱들입니다. 1인 개발 프로젝트로 기획, 개발과 디자인을 했습니다. 구글
          플레이스토어, AppleStore 플랫폼에 배포 했습니다.
        </h5>

        <GameBox>
          <BigIcon
            style={{
              backgroundImage: `url(${env.PUBLIC_URL}/assets/app01.jpg)`,
            }}
          />
          <TextBox>
            <h1>서랍속 슬라임</h1>
            <div className="sub_title">
              <span className="green">캐쥬얼</span>
            </div>
            <div className="sub_title">
              <span>광고 포함 /</span>
            </div>
            <GameText>
              <p>
                서랍속 슬라임은 레벨이 15까지 있는 단순한 게임입니다. 슬라임들이
                서로 부딪히지 않게 움직여 제한 시간을 버티면 클리어 입니다.
                슬라임 캐릭터 마다 움직임과 특징이 존재합니다. 구글 애드몹 보상
                광고를 통한 수익 방식을 가집니다.
              </p>
            </GameText>
          </TextBox>
        </GameBox>
        <IconDescription>
          <SliderContainer height="21vh">
            {drawers.map((drawer, index) => (
              <Item
                key={index}
                wSize={"20vw"}
                imgSrc={drawer.imgSrc}
                name={drawer.name}
              />
            ))}
          </SliderContainer>
        </IconDescription>

        <GameBox>
          <TextBox>
            <h1>스티커 슬라임</h1>
            <div className="sub_title">
              <span className="green">캐쥬얼</span>
            </div>
            <div className="sub_title">
              <span>광고 포함 /</span>
              <span>인앱 결제</span>
            </div>
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
          <BigIcon
            style={{
              backgroundImage: `url(${env.PUBLIC_URL}/assets/app02.png)`,
            }}
          />
        </GameBox>

        <IconDescription style={{ marginTop: 100 }}>
          <SliderContainer height="300px">
            {stickers.map((sticker, index) => (
              <Item
                key={index}
                wSize={"120px"}
                imgSrc={sticker.imgSrc}
                name={sticker.name}
              />
            ))}
          </SliderContainer>
        </IconDescription>
      </OnePerson>
    </WindowModal>
  );
};

export default Others;
