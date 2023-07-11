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
    keywords: "추홍규, 프론트 엔드, Mr.chu, 포트폴리오, chu_hong_kyu",
    imgsrc:
      "https://raw.githubusercontent.com/chuhongkyu/Mr_chu_HomePage/main/public/assets/home.png",
    url: "https://mrchu.netlify.app",
  };

  const makeData = (path:string) => {
    if (path === "/home") {
      path = path.slice(1);
    }else if(path === "/home/resume"){
      path = path.slice(6);
    }
    return path;
  }

  const makeDescription = (desc:string) => {
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
          desc = "미스터추, 추홍규의 토이 프로젝트들을 확인 해보세요"
        break;
      default:
          desc = "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. 컴퓨터 화면과 같은 홈페이지를 감상해 보세요."
        break;
    }
    return desc  
  }

  return (
    <Helmet>
      <title>{makeData(location.pathname) ? "추홍규 FE 개발자 " + makeData(location.pathname) : title}</title>

      <meta name="description" content={makeData(location.pathname) ? makeDescription(makeData(location.pathname)) : description} />
      <meta name="keywords" content={metaData.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={"추홍규 FE 개발자 " + makeData(location.pathname)} />
      <meta property="og:site_name" content={"추홍규 FE 개발자 " + makeData(location.pathname)} />
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
  description: "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. 마포구청, CASS 월드컵, 롯데백화점, 정관장, 한국타이어등",
}

export default Meta;
