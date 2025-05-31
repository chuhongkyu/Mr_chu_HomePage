import { AppItem } from "./AppType";

const cloum1Apps: AppItem[] = [
    { type: "folder", label: "Resume", name: "resume", color: "rgb(224,64,47)", link: "/resume" },
    { type: "folder", label: "About", name: "about", color: "rgb(238,188,17)", link: "/about" },
   
    { type: "img", imgSrc: "/assets/game/sticker_slime_logo.png", className: "square", label: "1인 개발", name: "game", color: "rgb(121, 120, 120)", link: "/game" },
];

const cloum2Apps: AppItem[] = [
    { type: "img", imgSrc: "/assets/project/genaimo.jpg", label: "Genaimo", className: "square", name: "Genaimo", color: "rgb(46,142,214)", link: "/project/204c588d-b9e9-80b3-b0cf-d19e755bce9b" },
];

const cloum3Apps: AppItem[] = [
    { type: "img", imgSrc: "/assets/project/삼성액티브자산운용.jpg", label: "삼성액티브자산운용", name: "삼성액티브자산운용", color: "rgb(46,142,214)", link: "/project/f3994247d75c4d7fa97801c5b537a80e" },
    { type: "img", imgSrc: "/assets/project/롯데백화점리뉴얼.jpg", label: "롯데백화점리뉴얼", name: "롯데백화점리뉴얼", color: "rgb(46,142,214)", link: "/project/24c135b5b0e44e77bf8e1f3c998bda2c" },
    { type: "img", imgSrc: "/assets/project/CassCool.jpg", label: "Cass Cool", name: "Cass Cool", color: "rgb(46,142,214)", link: "/project/2089060f0a0f4b42b8f3f9c433584c35" },
];

const cloum4Apps: AppItem[] = [
    { type: "img", imgSrc: "/assets/project/주차연습.jpg", label: "주차연습\n게임", name: "주차연습게임", color: "rgb(46,142,214)", link: "/project/926be7c4f8f34b1e8a2f008d8febf8d6" },
];







const widgetApps: AppItem[] = [
    { type: "img", imgSrc: "/assets/icons/linkedin.svg", label: "링크드인", name: "링크드인", color: "rgb(46,142,214)", outlink: "https://www.linkedin.com/in/hong-kyu-chu-a38b9a249" },
    { type: "img", imgSrc: "/assets/icons/github.svg", label: "깃허브", name: "깃허브", color: "rgb(0,0,0)", outlink: "https://github.com/chuhongkyu" },
    { type: "img", imgSrc: "/assets/icons/instagram.svg", label: "Instagram", name: "Instagram", color: "rgb(0,0,0)", outlink: "https://github.com/chuhongkyu" },
]
  

export { cloum1Apps, cloum2Apps, cloum3Apps, cloum4Apps, widgetApps };