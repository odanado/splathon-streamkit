import type { Match } from "../../../schema/match";
import classes from "./SplashScoreboard.module.css";

type Props = {
  match: Match;
};

export const SplashScoreboard = ({ match }: Props) => {
  const alphaName = `${match.alpha.name}`;
  const bravoName = `${match.bravo.name}`;
  const alphaScore = `${match.alpha.score}`;
  const bravoScore = `${match.bravo.score}`;
  return (
    <div className={classes.background}>
      <div className={`${classes.alphaName} + ${classes.teamName}`}>
        {alphaName}
      </div>
      <div className={`${classes.bravoName} + ${classes.teamName}`}>
        {bravoName}
      </div>
      <div className={`${classes.alphaScore} + ${classes.score}`}>
        {alphaScore}
      </div>
      <div className={`${classes.bravoScore} + ${classes.score}`}>
        {bravoScore}
      </div>
    </div>
  );
};
