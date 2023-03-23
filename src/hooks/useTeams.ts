import { useLocalStorage } from "usehooks-ts";

type Team = {
  name: string;
};
type Teams = {
  alpha: Team;
  bravo: Team;
};

export const useTeams = () => {
  const [teams, setTeams] = useLocalStorage<Teams>("teams", {
    alpha: { name: "" },
    bravo: { name: "" },
  });

  return {
    teams,
    setTeams,
  };
};
