import { TextGroup } from "@/components/common/page/container/ContentContainer";
import styles from "@/style/sub-page.module.scss";
import Image from "next/image";

const ContentTwo = () => {
  return (
    <div className={styles["content"]}>
        <TextGroup>
            <div className="title">
              Sticker Slime(스티커 슬라임)
            </div>
            
            <div className="description">
              <a 
                className="app-icon"
                target="_blank"
                rel="noopener noreferrer"
                href="https://play.google.com/store/apps/details?id=com.Mr.chu.StickerSlime&hl=ko">
                <Image width={120} height={120} src="/assets/game/sticker_slime_logo.png" alt="sitckerslime"/>
              </a>
              <div className="sub-title">
                기획 단계
              </div>
              <span>
                기획단계를 게임을 무엇을 개발할지 고민을 많이 하였습니다. 
                저는 일단 모바일 게임이란 간단하고 쉽게 플레이 할 수 있어야한다고 생각했습니다. 
                시장에서는 간단하지만 이미 재미있다고 평가받는 게임 장르들이 많이 있었습니다.
                예를들어 &apos;런 게임&apos;, &apos;퍼즐&apos;, &apos;물체 피하기 게임&apos;등이 있습니다.
                저는 이들 중에서 &apos;물체 피하기 게임&apos;을 베이스로 잡기로 하였습니다.
                전형적인 &apos;물체 피하기 게임&apos;에서 추가로 다양한 캐릭터와 장치를 추가하여 재미를 더 하기로 하였습니다.
                캐릭터들은 다양한 스킬과 능력치를 갖고 있습니다. 
                2.5D 느낌을 주는 스티커 캐릭터들은 귀여움에 차별성을 더합니다.
                <br/>
                <br/>
              </span>
              <div className="sub-title">
                타겟 시장
              </div>
              <span>
                ‘스티커 슬라임’은 기본적으로 영어권을 기준으로 개발했습니다.
                모바일 게임들은 플랫폼들의 정책이 까다롭습니다. 
                대신에 글로벌로 배포할 수있다는 엄청난 장점이 있습니다.
                그렇기 때문에 이용자수가 많은 언어권으로 배포를 해야합니다.
                default 언어를 영어권으로 설정하여 개발한 덕분에 많은 유저들이 게임에 참여할 수 있었습니다.
                <br/>
                <br/>
                <p className="description-underline">&apos;스리랑카&apos;에서 제일 반응이 좋았다.</p>
              </span>
            </div>
        </TextGroup>
    </div>
  )
};

export default ContentTwo;
