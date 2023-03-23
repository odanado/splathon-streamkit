import { useRef } from "react";
import { useScores } from "../../hooks/useScores";
import { useTeams } from "../../hooks/useTeams";

export const Index = () => {
  const { scores, setScores } = useScores();
  const { teams, setTeams } = useTeams();

  const alphaScoreRef = useRef<HTMLInputElement>(null);
  const bravoScoreRef = useRef<HTMLInputElement>(null);

  const alphaTeamRef = useRef<HTMLInputElement>(null);
  const bravoTeamRef = useRef<HTMLInputElement>(null);

  const updateScore = (
    alpha: string | undefined,
    bravo: string | undefined
  ) => {
    setScores({
      alpha: alpha ? parseInt(alpha) : 0,
      bravo: bravo ? parseInt(bravo) : 0,
    });
  };

  const updateTeam = (alpha: string | undefined, bravo: string | undefined) => {
    setTeams({
      alpha: { name: alpha ?? "" },
      bravo: { name: bravo ?? "" },
    });
  };

  const handleClick = () => {
    updateScore(alphaScoreRef.current?.value, bravoScoreRef.current?.value);
    updateTeam(alphaTeamRef?.current?.value, bravoTeamRef?.current?.value);
  };

  return (
    <div>
      <button onClick={handleClick}>更新</button>
      <div>
        scores
        <div>
          alpha:
          <input ref={alphaScoreRef} type="text" />
        </div>
        <div>
          bravo:
          <input ref={bravoScoreRef} type="text" />
        </div>
      </div>
      <div>
        teams
        <div>
          alpha:
          <input ref={alphaTeamRef} type="text" />
        </div>
        <div>
          bravo:
          <input ref={bravoTeamRef} type="text" />
        </div>
      </div>
    </div>
  );
};
