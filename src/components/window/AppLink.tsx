import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components"

const App = styled(motion.div)`
  grid-column: span;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-self: center;
    align-items: center;
    flex-direction: column;
    p{
      white-space: pre-line;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
  }
  @media ${(props) => props.theme.device.mobile} {
  }
`;

const Svg = styled(motion.svg)``;

interface IApp {
  title: string;
  type: string;
  pathUrl: string;
}

const AppLink = ({ title, type, pathUrl }: IApp) => {
  const choosePage = () => {
    switch (type) {
      case "resume":
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            width="50px"
            height="50px"
            stroke="black"
            strokeWidth="2"
          >
            <g id="surface983695">
              <motion.path
                initial={{ pathLength: 0, fill: "rgb(224,64,47)" }}
                animate={{
                  pathLength: 1,
                  fill: "rgb(224,64,47)",
                  transition: { duration: 2 },
                }}
                whileHover={{
                  fill: "rgb(0,0,0)",
                  y: -7,
                  transition: { duration: 0.5, type: "spring" },
                }}
                d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
              />
            </g>
          </Svg>
        );
      case "about":
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            width="50px"
            height="50px"
            stroke="black"
            strokeWidth="2"
          >
            <g id="surface983695">
              <motion.path
                initial={{ pathLength: 0, fill: "rgb(238,188,17)" }}
                animate={{
                  pathLength: 1,
                  fill: "rgb(238,188,17)",
                  transition: { duration: 2 },
                }}
                whileHover={{
                  fill: "rgb(0,0,0)",
                  y: -7,
                  transition: { duration: 0.5, type: "spring" },
                }}
                d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
              />
            </g>
          </Svg>
        );
      case "unity":
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            width="50px"
            height="50px"
            stroke="black"
            strokeWidth="2"
          >
            <g id="surface983695">
              <motion.path
                initial={{ pathLength: 0, fill: "rgb(121, 120, 120)" }}
                animate={{
                  pathLength: 1,
                  fill: "rgb(121, 120, 120)",
                  transition: { duration: 2 },
                }}
                fill="gray"
                whileHover={{
                  fill: "rgb(0,0,0)",
                  y: -7,
                  transition: { duration: 0.5, type: "spring" },
                }}
                d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
              />
            </g>
          </Svg>
        );
      case "project":
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            width="50px"
            height="50px"
            stroke="black"
            strokeWidth="2"
          >
            <g id="surface983695">
              <motion.path
                initial={{ pathLength: 0, fill: "rgb(46,142,214)" }}
                animate={{
                  pathLength: 1,
                  fill: "rgb(46,142,214)",
                  transition: { duration: 2 },
                }}
                whileHover={{
                  fill: "rgb(0,0,0)",
                  y: -7,
                  transition: { duration: 0.5, type: "spring" },
                }}
                d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
              />
            </g>
          </Svg>
        );
      case "github":
        return (
          <Svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="50px"
            height="50px"
            whileHover={{
              y: -7,
              transition: { duration: 0.5, type: "spring" },
            }}
          >
            <motion.path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
          </Svg>
        );
      default:
        return (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
            width="50px"
            height="50px"
            stroke="black"
            strokeWidth="2"
          >
            <g id="surface983695">
              <motion.path
                initial={{ pathLength: 0, fill: "white" }}
                animate={{ pathLength: 1, fill: "white" }}
                transition={{ duration: 2 }}
                fill="white"
                whileHover={{ fill: "rgb(0,0,0)" }}
                d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
              />
            </g>
          </Svg>
        );
    }
  };

  return (
    <App>
      {title === 'github' ? 
        <a 
        href="https://github.com/chuhongkyu"
        target="_blank"
        rel="noopener noreferrer">
          {choosePage()}
          <p className="font-app">{title}</p>
        </a>      
      :
      <Link to={`/home/${pathUrl === 'unity' ? 'game_app' : pathUrl}`}>
        {choosePage()}
        <p className="font-app">{title === "project" ? "Project Toy" : title.toUpperCase()}</p>
      </Link>}
    </App>
  );
};

AppLink.defaultProps = {
  title: "이름",
  type: { fill: "white", stroke: "black", re_fill: "white" },
  pathUrl: "",
};

export default AppLink;
