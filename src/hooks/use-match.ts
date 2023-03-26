import { doc } from "firebase/firestore";
import { useFirestore } from "../firebase";
import { matchSchema } from "../schema/match";
import { useFirestoreDoc } from "./use-firestore-doc";

export const useMatch = (userId: string) => {
  const firestore = useFirestore();

  const key = ["users", userId, "match"];

  const { data, dataOnce, isLoading, error, mutate } = useFirestoreDoc(
    userId === "" ? undefined : key,
    () => doc(firestore, "users", userId),
    matchSchema,
    "match"
  );

  return {
    match: data,
    matchOnce: dataOnce,
    isLoading,
    error,
    mutate,
  };
};
