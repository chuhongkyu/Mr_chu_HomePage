import { motion } from "motion/react";
import styles from "@/style/page.module.scss";

const Variants = {
  initial: { y: "100%" },
  animate: { y: 0 , transition:{ duration: 0.3, ease: "linear" } },
};

const Menu = () => {
  return (
    <motion.ul
      className={styles["side-container"]}
      variants={Variants} initial="initial" animate="animate">
      <li className={styles["left-side"]}>
        
      </li>
      <li className={styles["right-side"]}>
        <div className={styles["grid"]}>
          <a
            className={styles["grid-item"]}
            href="https://match-fruits-mrchu.vercel.app/"
            target="blank"
          >
            <img
              src={"/assets/works/match-landscape.jpg"}
              alt="Match-fruits"
            />
            <div>
              <h2>Match-fruits</h2>
              <p>NEXT.js, 카드 맞추기 게임</p>
            </div>
          </a>
          <a
            className={styles["grid-item"]} 
            target="blank" href="https://chuhongkyu.github.io/interact_3D/">
            <img src={"/assets/img/about/01.jpg"} alt="mario" />
            <div>
              <h2>마리오 월드(개발자)</h2>
              <p>three.js, 3D </p>
            </div>
          </a>
        </div>
      </li>
    </motion.ul>
  );
};

export default Menu;
