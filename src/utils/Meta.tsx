import { Helmet } from "react-helmet-async";

interface IProps {
  title: string;
  description: string;
}

const Meta = (props:IProps) => {
  const {title, description} = props
  const metaData = {
    keywords: "추홍규, 프론트 엔드, Mr.chu, 포트폴리오, chu_hong_kyu",
    imgsrc:
      "https://raw.githubusercontent.com/chuhongkyu/Mr_chu_HomePage/main/public/assets/home.png",
    url: "https://mrchu.netlify.app",
  };

  return (
    <Helmet>
      <title>{"Mr.chu 홈페이지 " + title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={metaData.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Mr.chu 홈페이지 " + title} />
      <meta property="og:site_name" content={"Mr.chu 홈페이지 " + title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaData.imgsrc} />
      <meta property="og:url" content={metaData.url} />
    
      <meta name="twitter:title" content={"Mr.chu 홈페이지 " + title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaData.imgsrc} />

      <link rel="canonical" href={metaData.url} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "home",
  description: "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. CASS 월드컵, 롯데백화점, 정관장, 한국타이어등 이력을 확인해보세요.",
}

export default Meta;
