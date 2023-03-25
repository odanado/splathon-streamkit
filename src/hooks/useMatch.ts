import { doc } from "firebase/firestore";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce,
} from "reactfire";
import { matchSchema } from "../schema/match";
import type { Match } from "../schema/match";

export const useMatch = (
  userId: string,
  { subscribe }: { subscribe: boolean }
) => {
  const firestore = useFirestore();

  const ref = doc(firestore, "users", userId);

  const { status, data } = subscribe
    ? useFirestoreDocData(ref)
    : useFirestoreDocDataOnce(ref);

  const match = data?.match;
  console.log("useMatch", { userId, status, match, data });

  if (status === "success") {
    if (match) {
      return { status, match: matchSchema.parse(match) };
    }

    const defaultMatch: Match = {
      id: "0-0",
      alpha: {
        name: "Alpha",
        score: 0,
      },
      bravo: {
        name: "Bravo",
        score: 0,
      },
    };
    return { status, match: defaultMatch };
  }

  return { status, match: undefined };
};
