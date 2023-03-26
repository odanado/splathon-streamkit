import { useParams } from "react-router-dom";
import { OverlayContainer } from "../../components/OverlayContainer/OverlayContainer";
import { useMatch } from "../../hooks/useMatch";

export const Overlay = () => {
  const { userId } = useParams();
  const { isLoading, match } = useMatch(userId ?? "");

  if (isLoading || !match) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <OverlayContainer kind="" match={match} />
    </div>
  );
};
