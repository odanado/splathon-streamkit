import type { Match } from "../../../schema/match";
import classes from "./Izakaya.module.css";

type Props = {
  match: Match;
};

export const Izakaya = ({ match }: Props) => {
  const info = `${match.alpha.name} ${match.alpha.score} - ${match.bravo.score} ${match.bravo.name}`;

  return <div className={classes.info}>{info}</div>;
};
