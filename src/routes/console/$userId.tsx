import { doc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useFirestore } from "../../firebase";
import { useMatch } from "../../hooks/use-match";
import { matchSchema } from "../../schema/match";
import { TeamForm } from "../../components/TeamForm";
import { Team } from "../../schema/team";
import { Usage } from "../../components/Usage";
import { WarningForBeta } from "../../components/WarningForBeta";
import { useLadderMatches } from "../../hooks/use-ladder-matches";
import { SelectLadderMatch } from "../../components/SelectLadderMatch";
import { LadderMatch } from "../../schema/ladder-match";

export const Console = () => {
  const { userId } = useParams();
  if (!userId) {
    throw new Error("userId is required");
  }
  const firestore = useFirestore();

  const { isLoading, match } = useMatch(userId);
  const { ladderMatchesOnce } = useLadderMatches();

  // TODO: suspense にする
  if (isLoading || !match || !ladderMatchesOnce) {
    return <div>loading...</div>;
  }
  console.log("match", match.alpha.name);

  const onChangeTeam = async (side: "alpha" | "bravo", team: Team) => {
    const ref = doc(firestore, "users", userId);

    const newMatch = {
      ...match,
      [side]: {
        ...team,
      },
    };

    matchSchema.parse(newMatch);

    // TODO: mutation にする
    await setDoc(ref, { match: newMatch });
  };

  const handleLadderMatchChange = async (ladderMatch: LadderMatch) => {
    console.log({ ladderMatch });
    const ref = doc(firestore, "users", userId);

    const newMatch = {
      ...match,
      alpha: {
        ...match.alpha,
        name: ladderMatch.alpha,
      },
      bravo: {
        ...match.bravo,
        name: ladderMatch.bravo,
      },
    };

    matchSchema.parse(newMatch);

    // TODO: mutation にする
    await setDoc(ref, { match: newMatch });
  };

  return (
    <Box>
      <Box mt={2}>
        <WarningForBeta />
      </Box>
      <Box mt={2}>
        <Usage userId={userId} />
      </Box>
      <Box mt={2}>
        <SelectLadderMatch
          ladderMatches={ladderMatchesOnce}
          onChange={handleLadderMatchChange}
        />
      </Box>
      <Box mt={2}>
        <TeamForm
          side="アルファチーム"
          team={match.alpha}
          onChange={(team) => onChangeTeam("alpha", team)}
        />
      </Box>
      <Box mt={2}>
        <TeamForm
          side="ブラボーチーム"
          team={match.bravo}
          onChange={(team) => onChangeTeam("bravo", team)}
        />
      </Box>
    </Box>
  );
};
