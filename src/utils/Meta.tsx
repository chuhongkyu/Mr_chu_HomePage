import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface IProps {
  title: string;
  description: string;
}

const Meta = (props:IProps) => {
  const location = useLocation()
  const {title, description} = props
  const metaData = {
    keywords: "프론트 엔드, FE Developer, 웹 개발자, three.js",
    imgsrc:
      "https://raw.githubusercontent.com/chuhongkyu/Mr_chu_HomePage/main/public/assets/home.png",
    url: "https://mrchu.netlify.app",
  };

  const makeData = (path:string) => {
    if (path === "/home") {
      path = path.slice(1);
    }else{
      path = path.replace(/^\/home/, '').slice(1);
    }
    return path;
  }

  const makeDescription = (desc:string) => {
    console.log(desc)
    switch (desc) {
      case "home":
          desc = "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. 컴퓨터 화면과 같은 홈페이지를 감상해 보세요."
        break;
      case "resume":
          desc = "이력서 | 마포구청, CASS 월드컵, 롯데백화점 리뉴얼, 정관장 kgc, CASS COOL"
        break;
      case "about":
          desc = "개발자의 환상, 반응형 웹 개발 방법, 마포구청, 성능 최적화"
        break;
      case "game_app":
          desc = "유니티로 만든 1인개발 스티커슬라임, 서랍속 슬라임"
        break;
      case "project":
          desc = "프로젝트 | 다양한 프로젝트 삼성, 롯데, 정관장, CASS"
        break;
      default:
          desc = "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. 컴퓨터 화면과 같은 홈페이지를 감상해 보세요."
        break;
    }
    return desc  
  }

  return (
    <Helmet>
      <title>{makeData(location.pathname) ? "추홍규 FE 개발자 " + makeData(location.pathname).toUpperCase() : title}</title>

      <meta name="description" content={makeData(location.pathname) ? makeDescription(makeData(location.pathname)) : description} />
      <meta name="keywords" content={metaData.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={"추홍규 FE 개발자 " + makeData(location.pathname).toUpperCase()} />
      <meta property="og:site_name" content={"추홍규 FE 개발자 " + makeData(location.pathname).toUpperCase()} />
      <meta property="og:description" content={makeData(location.pathname) ? makeDescription(makeData(location.pathname)) : description} />
      <meta property="og:image" content={metaData.imgsrc} />
      <meta property="og:url" content={metaData.url} />
    
      <meta name="twitter:title" content={"추홍규 FE 개발자 " + makeData(location.pathname)} />
      <meta name="twitter:description" content={makeData(location.pathname) ? makeDescription(makeData(location.pathname)) : description} />
      <meta name="twitter:image" content={metaData.imgsrc} />

      <link rel="canonical" href={metaData.url} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "home",
  description: "추홍규 | 프론트 엔드의 홈페이지입니다.",
}

export default Meta;
