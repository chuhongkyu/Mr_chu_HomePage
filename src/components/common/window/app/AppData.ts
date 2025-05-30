import { AppItem } from "./AppType";

const initialApps: AppItem[] = [
    { type: "folder", label: "Resume", name: "resume", color: "rgb(224,64,47)", link: "/resume" },
    { type: "folder", label: "About", name: "about", color: "rgb(238,188,17)", link: "/about" },
   
    { type: "folder", label: "Unity", name: "unity", color: "rgb(121, 120, 120)", link: "/unity" },
  
    { type: "img", imgSrc: "/assets/project/삼성액티브자산운용.jpg", label: "삼성액티브자산운용", name: "삼성액티브자산운용", color: "rgb(46,142,214)", link: "/project/f3994247d75c4d7fa97801c5b537a80e" },
    { type: "img", imgSrc: "/assets/project/롯데백화점리뉴얼.jpg", label: "롯데백화점리뉴얼", name: "롯데백화점리뉴얼", color: "rgb(46,142,214)", link: "/project/24c135b5b0e44e77bf8e1f3c998bda2c" },
    { type: "img", imgSrc: "/assets/project/주차연습.jpg", label: "주차연습\n게임", name: "주차연습게임", color: "rgb(46,142,214)", link: "/project/926be7c4f8f34b1e8a2f008d8febf8d6" },
];

const widgetApps: AppItem[] = [
    { type: "img", imgSrc: "/assets/icons/linkedin.svg", label: "링크드인", name: "링크드인", color: "rgb(46,142,214)", outlink: "https://www.linkedin.com/in/hong-kyu-chu-a38b9a249" },
    { type: "img", imgSrc: "/assets/icons/github.svg", label: "깃허브", name: "깃허브", color: "rgb(0,0,0)", outlink: "https://github.com/chuhongkyu" },
]
  

export { initialApps, widgetApps };