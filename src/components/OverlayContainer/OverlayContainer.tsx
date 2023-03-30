import type { Match } from "../../schema/match";
import { Izakaya } from "../Overlays/Izakaya";
import classes from "./OverlayContainer.module.css";

type Props = {
  kind: string;
  match: Match;
};

export const OverlayContainer = ({ match }: Props) => {
  const isObs = /OBS/.test(navigator.userAgent);
  const backgroundColor = isObs ? "transparent" : "black";
  // TODO: update type
  const style = {
    "--overlay-background-color": backgroundColor,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <div style={style} className={classes.overlay}>
      <Izakaya match={match} />
    </div>
  );
};
