import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../../firebase";
import { useMatch } from "../../hooks/use-match";
import { matchSchema, type Match } from "../../schema/match";

export const Console = () => {
  const { userId } = useParams();
  const firestore = useFirestore();
  const [state, setState] = useState<Match>({
    id: "",
    alpha: {
      name: "",
      score: 0,
    },
    bravo: {
      name: "",
      score: 0,
    },
  });

  const { isLoading, match } = useMatch(userId ?? "");

  if (isLoading || !match) {
    return <div>loading...</div>;
  }

  const handleChange = async (
    side: "alpha" | "bravo",
    field: "name" | "score",
    value: unknown
  ) => {
    const ref = doc(firestore, "users", userId ?? "");

    const newMatch = {
      ...match,
      [side]: {
        ...match?.[side],
        [field]: value,
      },
    };

    matchSchema.parse(newMatch);

    await setDoc(ref, { match: newMatch });

    if (JSON.stringify(match) !== JSON.stringify(newMatch)) {
      setState((prev) => ({
        ...prev,
        [side]: {
          ...prev[side],
          [field]: value,
        },
      }));
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Done");
  };

  return (
    <div>
      <div>hello {userId}</div>
      <div>
        alpha:
        <div>
          name:
          <input
            type="text"
            value={match?.alpha.name}
            onChange={(e) => handleChange("alpha", "name", e.target.value)}
          />
          score:
          <input
            type="text"
            value={match?.alpha.score}
            onChange={(e) => handleChange("alpha", "score", e.target.value)}
          />
        </div>
      </div>
      <div>
        bravo:
        <div>
          name:
          <input
            type="text"
            value={match?.bravo.name}
            onChange={(e) => handleChange("bravo", "name", e.target.value)}
          />
          bravo:
          <input
            type="text"
            value={match?.bravo.score}
            onChange={(e) => handleChange("bravo", "score", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
