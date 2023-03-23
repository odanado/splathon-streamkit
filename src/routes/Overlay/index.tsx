import classes from "./styles.module.css";
// import scoreImage from "../../assets/splatoon_score_yb_1720_1080.png";
import { useScores } from "../../hooks/useScores";

export const Overlay = () => {
  const { scores } = useScores();

  return (
    <div className={classes.overlay}>
      poyo
      <div
        className={classes.izakaya}
      >{`${scores.alpha} - ${scores.bravo}`}</div>
    </div>
  );
};
