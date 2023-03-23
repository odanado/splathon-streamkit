import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type Scores = {
  alpha: number;
  bravo: number;
};

export const useScores = () => {
  const [scores, setScores] = useLocalStorage<Scores>("scores", {
    alpha: 0,
    bravo: 0,
  });

  return {
    scores,
    setScores,
  };
};
