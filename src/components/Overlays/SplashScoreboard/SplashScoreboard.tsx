import type { Match } from "../../../schema/match";
import classes from "./SplashScoreboard.module.css";

type Props = {
  match: Match;
};

export const SplashScoreboard = ({ match }: Props) => { 
  return <div className={classes.background}></div>;
};
