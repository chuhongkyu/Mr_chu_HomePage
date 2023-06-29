interface IWorks {
  id: number;
  name: string;
  date: string;
  img: string;
  description: string;
  point: string[];
  github: string;
  link: string;
  skills: string[];
  people: string;
  company?: string;
}

export interface IWorksArray extends Array<IWorks> {}

export const worksData = [
  {
    id: 0,
    name: "We T",
    date: "2023.05.13",
    img: "/assets/works/project_0.png",
    description:
      `우리들의 OTT "We T"입니다. "We T"는 개인 프로젝트로 개발된 온라인 플랫폼입니다.\n 이 플랫폼은 OTT(Over-The-Top) 서비스들을 비교하고 사용자들끼리 이야기를 나누는 게시판 기능을 제공합니다.
      "We T"에는 로그인과 회원가입 기능이 있어 사용자들은 자신의 계정으로 플랫폼에 접속할 수 있습니다. 로그인 기능은 구글 OAuth를 통해 구현되어 있어 편리하게 사용할 수 있습니다.
      플랫폼의 캐릭터는 귀여운 고양이 모양의 의자로 디자인되었습니다. 이 캐릭터는 사용자들에게 친근감을 주며, 편안하게 플랫폼을 이용할 수 있도록 도와줍니다.
      주요 기능인 게시판은 사용자들이 다양한 OTT 서비스들을 비교하고 관련 이야기를 나눌 수 있는 공간입니다. 여기서 사용자들은 각자의 경험과 의견을 공유하며, OTT 서비스들에 대한 정보를 얻을 수 있습니다. 이를 통해 사용자들은 어떤 OTT 서비스가 자신에게 맞는지에 대한 판단을 도울 수 있습니다.
      "We T"는 다양한 기술과 도구를 사용하여 개발되었습니다. 프론트엔드 개발에는 NEXT.js를 활용하여 웹 인터페이스를 구성했고, 백엔드는 MongoDB를 사용하여 데이터를 관리합니다. 또한 TypeScript를 사용하여 코드의 안정성과 가독성을 높였습니다.
      이 프로젝트는 풀스택 코딩으로 개발되었으며, 개인 프로젝트로 진행되었습니다. "We T"의 온라인 플랫폼을 아래 링크를 통해 접속할 수 있습니다.\n
      "We T"는 OTT 서비스에 대한 정보를 공유하고 소통할 수 있는 플랫폼으로, 사용자들에게 유용한 경험을 제공합니다. 다양한 OTT 서비스에 관심이 있는 분들에게 추천드립니다.`
      ,
    point: ["로그인", "회원가입", "게시판"],
    github: "",
    link: "https://we-t-ott.vercel.app/",
    skills: ["NEXT.js", "MongoDB", "TS"],
    people: "풀스택 코딩",
    company: "개인 프로젝트"
  },
  {
    id: 1,
    name: "마리오 월드(개발자)",
    date: "2023.03.09",
    img: "/assets/img/about/01.png",
    description:
      `지금 소개할 프로젝트는 '마리오 월드(개발자)'입니다.\n 이 프로젝트는 개발자들을 위한 흥미로운 경험을 제공하기 위해 three.js를 활용하여 웹에 3D 모델들을 보여줍니다.
      '마리오 월드(개발자)'는 마리오를 통해 개발자들의 인생을 엿볼 수 있는 특별한 경험을 제공합니다. 이 웹 페이지에 접속하면 마리오와 함께 다양한 이벤트 칸을 탐험할 수 있습니다. 이 이벤트 칸에 들어가면 개발자들의 재미난 에피소드와 함께 모델링된 요소들이 나타나게 됩니다.
      마리오를 조종하면서 버섯을 총 3개 수집하는 임무를 가지게 됩니다. 이를 통해 마리오 월드(개발자)를 클리어할 수 있습니다. 이 재미난 게임 요소는 개발자들에게 흥미를 끌어주고, 마리오를 통한 체험 속에서 재밌고 유익한 시간을 보낼 수 있게 해줍니다.
      three.js를 주요 기술로 사용하여 웹에서 3D 모델을 렌더링하고 구현했습니다. 또한 webpack을 사용하여 모듈 번들링하고 CSS를 통해 디자인과 스타일을 구성했습니다.
      `,
    point: ["three.js"],
    github: "",
    link: "https://chuhongkyu.github.io/interact_3D/",
    skills: ["three.js", "webpack", "css"],
    people: "개인 프로젝트",
    company: "개인 프로젝트"
  },
  {
    id: 2,
    name: "SECOND_LIFE",
    date: "2022.07",
    img: "/assets/works/second_life.gif",
    description:
      "마포구청에서 일할 때 기획 된 헌 옷 수거 플랫폼 입니다. 프론트 엔드 프로젝트 리더로서 크게는 환경설정, 로그인 페이지, 롤링 배너를 담당했습니다. 구체적으로는 백으로부터 JWT를 요청, 리덕스 툴킷을 통해 데이터를 전역 관리합니다. 이를 통해서 로그인, 간편 로그인(카카오,구글), 간편 회원가입, 자동 로그인, 인증 만료시 재 요청등의 기능을 구현했습니다. 토큰을 활용한 로그인 프로세스에 대해 고민을 많이 할 수 있었습니다.",
    point: ["로그인", "판매", "예약"],
    github: "https://github.com/Mapo-Project/SecondLife-frontend",
    link: "https://mapo-project.github.io/SecondLife-frontend/",
    skills: ["React", "Redux-toolik", "useForm"],
    people: "프론트 엔드 3명 중 1명",
    company: "마포구청"
  },
  // {
  //   id: 3,
  //   name: "마포 버디즈",
  //   date: "(2022.06 ~ 2022.07)",
  //   img: "/assets/works/buddies.gif",
  //   description:
  //     "마포 버디즈 홈페이지, 버디즈는 우체통 캐릭터입니다. Email.js를 활용하여 닉네임과 Email을 입력시 행운의 편지가 메일로 전송됩니다. 귀여운 캐릭터와 일러스트, 스토리에 대해 홈페이지를 통해 알 수 있습니다. 2022년 캐릭터 라이선싱 페어 전시 되었습니다. 프로젝트를 하면서 캐릭터 팀(기획자들)의 요구는 끝이 없다는 것을 알게 되었습니다. 그러므로 프로젝트의 방향성이 빠르게 결정되지 못하면 개발 시간이 줄어든 다는 것을 알게 되었습니다.",
  //   point: ["상세 페이지, ", "Email 송신 시스템"],
  //   github: "https://github.com/chuhongkyu/mapoCharacter",
  //   link: "https://chuhongkyu.github.io/mapoCharacter/",
  //   skills: ["React", "email.js"],
  //   people: "프론트 엔드(1인 개발)",
  //   company: "마포구청"
  // },
  {
    id: 4,
    name: "BMW",
    date: "(2022.04.25 ~ )",
    img: "/assets/works/bmw.gif",
    description:
      "리액트와 Three 라이브러리를 활용하여 BMW모델을 인터랙티브하게 감상할 수 있게 하였습니다. 차체, 창문, 바퀴 색을 직접 변경하며 감상할 수 있습니다",
    point: ["모델 파츠 별로 색깔 변경 기능", "모델 회전"],
    github: "https://github.com/chuhongkyu/bmw-car/",
    link: "https://chuhongkyu.github.io/bmw-car/",
    skills: ["React", "three 라이브러리", "Blender"],
    people: "개인 프로젝트",
    company: "개인 프로젝트"
  },
  {
    id: 5,
    name: "넷플릭스",
    date: "(2022.05.29)",
    img: "/assets/works/chuflix.jpg",
    description:
      "리액트와 타입스크립트를 활용한 넷플릭스 클론 코딩입니다. Movie, Tv show, Search, Enter 페이지로 구성 되어 있습니다. ",
    point: ["영화, 드라마 검색", "콘텐츠 상세 보기"],
    github: "https://github.com/chuhongkyu/chuflix",
    link: "https://chuhongkyu.github.io/chuflix/",
    skills: ["React", "TypeScript"],
    people: "개인 프로젝트",
    company: "개인 프로젝트"
  },
  {
    id: 7,
    name: "마포구 이쁜 카페 소개 10선",
    date: "(2022.05.25)",
    img: "/assets/works/1project.png",
    description:
      "마포구 이쁜 카페 소개 10선, 바닐라JS 프로젝트 입니다. HOME 화면은 원형으로 도는 TEXT와 슬라이드 컨테이너가 있습니다. CSS로 만든 커피 관련 애니메이션이 있습니다. HASH태그 칸에서 10선한 카페 10개를 해쉬태그에 따라 분류에 볼 수 있습니다. MAP컨테이너에서는 카페를 선택하면 카카오 지도에서 카페를 볼 수 있습니다.",
    point: ["카페 검색, 지도", "인터랙티브, 다크모드"],
    github: "https://github.com/chuhongkyu/Cafe_HomePage",
    link: "https://chuhongkyu.github.io/Cafe_HomePage/",
    skills: ["javaScript"],
    people: "1인 개발 - 회사 프로젝트",
    company: "마포구청"
  },
  {
    id: 8,
    name: "말장난 게임",
    date: "2023.11",
    people: "개인 프로젝트",
    img: "/assets/works/word-play.png",
    description:
      "리액트로 만든 댓글 앱, 스터디를 하면서 불변성에 대해 공부하며 만든 앱입니다. 불변성이란 메모리 영역의 값을 변경할 수 없는 것입니다. 리액트는 불변성을 지켜줌으로써 효율적인 상태업데이트를 합니다. 사이드 이펙트를 사전 방지하고 프로그래밍의 구조를 단순하게 유지합니다. 불변성을 가진 원시타입과 달리 참조타입의 경우에는 의도적으로 불변성을 지켜주어야합니다. 그래서 새로운 주소 값을 가진 객체를 생성하여 상태를 업데이트 해줍니다. spread operator, map, filter, slice, reduce 메소드들을 활용",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://github.com/chuhongkyu/word-play",
    link: "https://word-play.vercel.app/",
    skills: ["React"],
    company: "개인 프로젝트"
  },
  {
    id: 9,
    name: "Cloud Coin",
    date: "(2022.06.25)",
    img: "/assets/works/coin.gif",
    description:
      "coinpaprika API를 활용하여 코인관련 앱을 만들었습니다. 여러 종류의 코인중 코인을 고르면 상세 페이지로 이동합니다. 상세 페이지는 코인의 공급 가격 그래프와 제일 높은 가격과 제일 낮은 가격 차트 그래프로 보실 수 있습니다. 전역 값 관리 라이브러리 recoil을 활용한 다크모드 기능이 있습니다.",
    point: ["코인 가격 그래프", "다크 모드", "Recoil"],
    github: "https://github.com/chuhongkyu/Coin-tickers",
    link: "https://chuhongkyu.github.io/Coin-tickers/",
    skills: ["React", "TypeScript"],
    people: "프론트 엔드(1인 개발)",
    company: "개인 프로젝트"
  },
];
