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
}

export interface IWorksArray extends Array<IWorks> {}

export const worksData = [
  {
    id: 0,
    name: "SECOND_LIFE",
    date: "(2022.07)",
    img: "/assets/works/second_life.gif",
    description:
      "마포구청에서 일할 때 기획 된 헌 옷 수거 플랫폼 입니다. 프론트엔드 리드로서 환경설정, 로그인 페이지, 배너를 현재 구현 했습니다. 백으로부터 JWT를 요청, 저장 관리합니다. 이를 통해서 로그인, 간편 로그인(카카오,구글), 간편 회원가입, 자동 로그인, 인증 만료시 재 요청등의 기능을 구현했습니다.",
    point: ["로그인, 판매, 예약"],
    github: "https://github.com/Mapo-Project/SecondLife-frontend",
    link: "https://mapo-project.github.io/SecondLife-frontend/",
    skills: ["React", "Redux-toolik", "useForm"],
    people: "UI/UX 2명, 프론트 엔드 3명, 백엔드 1명",
  },
  {
    id: 1,
    name: "마포 버디즈",
    date: "(2022.06 ~ 2022.07)",
    img: "/assets/works/buddies.gif",
    description:
      "마포 버디즈 홈페이지, 버디즈는 우체통 캐릭터입니다. Email.js를 활용하여 닉네임과 Email을 입력시 행운의 편지가 메일로 전송됩니다. 귀여운 캐릭터와 일러스트를 스크롤 홈페이지로 감상이 가능합니다. 2022년 캐릭터 라이선싱 페어 전시 되었습니다.",
    point: ["상세 페이지, ", "Email 송신 시스템"],
    github: "https://github.com/chuhongkyu/mapoCharacter",
    link: "https://chuhongkyu.github.io/mapoCharacter/",
    skills: ["React"],
    people: "캐릭터 디자인 5명, 프론트 엔드(1인 개발)",
  },
  {
    id: 2,
    name: "인터랙티브 코딩 취미",
    date: "(2022.03.30 ~ )",
    img: "/assets/works/cube.jpg",
    description:
      "자바스크립트와 CSS만으로 만든 인터랙티브 작업입니다. 첫번째 페이지에는 마우스를 따라 움직이는 귀여운 유령이 있습니다. 페이지에는 별이 랜덤으로 하늘에서 떨어집니다. 2번째 페이지는 회전하는 박스가 있습니다. 박스 가운데 빨간 점을 누르면 camera 시점이 변합니다.",
    point: ["마우스에 따라 돌아다니는 고스트", "회전하는 3D박스"],
    github: "https://chuhongkyu.github.io/Workspace_MaPo/",
    link: "https://chuhongkyu.github.io/Workspace_MaPo/",
    skills: ["바닐라 JS", "Html,Css"],
    people: "개인 프로젝트",
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    name: "넷플릭스",
    date: "(2022.05.29)",
    img: "/assets/works/chuflix.jpg",
    description:
      "리액트와 타입스크립트를 활용한 넷플릭스 클론 코딩입니다. Movie, Tv show, Search, Enter 페이지로 구성 되어 있습니다. ",
    point: ["영화, 드라마 검색", "콘텐츠 상세 보기"],
    github: "https://github.com/chuhongkyu/chuflix",
    link: "https://chuhongkyu.github.io/chuflix/",
    skills: ["React", "TypeScript"],
    people: "넷플릭스 클론 코딩(개인 프로젝트)",
  },
  {
    id: 5,
    name: "ToDo App",
    date: "(2022.05)",
    img: "/assets/works/todo.png",
    description:
      "할일 체크 앱입니다. 할일을 카테고리 별로 추가해 관리 할 수 있습니다.",
    point: ["할일 제거, 로컬스토리지 관리", "커스텀 카데고리 제작"],
    github: "https://github.com/chuhongkyu/todolist",
    link: "https://chuhongkyu.github.io/todolist/",
    skills: ["React", "TypeScript"],
    people: "노마드 코더 챌린지 - 우수작 (개인 프로젝트)",
  },
  {
    id: 6,
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
  },
  {
    id: 7,
    name: "댓글앱",
    date: "(2022.06)",
    people: "2022.03 (개인 프로젝트)",
    img: "/assets/works/comments.jpg",
    description:
      "리액트로 만든 댓글 앱, 스터디를 하면서 불변성에 대해 공부하며 만든 앱입니다. 불변성이란 메모리 영역의 값을 변경할 수 없는 것입니다. 리액트는 불변성을 지켜줌으로써 효율적인 상태업데이트를 합니다. 사이드 이펙트를 사전 방지하고 프로그래밍의 구조를 단순하게 유지합니다. 불변성을 가진 원시타입과 달리 참조타입의 경우에는 의도적으로 불변성을 지켜주어야합니다. 그래서 새로운 주소 값을 가진 객체를 생성하여 상태를 업데이트 해줍니다. spread operator, map, filter, slice, reduce 메소드들을 활용",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://github.com/chuhongkyu/Comments_app",
    link: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
  },
  {
    id: 8,
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
  },
  {
    id: 9,
    name: "CASS_WorldCup",
    date: "(2022.09)",
    img: "/assets/works/cass.jpeg",
    description: "카스 월드컵 기념",
    point: ["게임 6종, 경기 점수 예측, 카스 소개"],
    github: "/",
    link: "/",
    skills: ["Next.js", "gsap", "scss"],
    people: "더즈 10명",
  },
];
