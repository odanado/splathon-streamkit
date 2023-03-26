import { doc } from "firebase/firestore";
import { useFirestore } from "../firebase";
import { matchSchema } from "../schema/match";
import { useFirestoreDoc } from "./useFirestoreDoc";

export const useMatch = (userId: string) => {
  const firestore = useFirestore();

  const userRef = doc(firestore, "users", userId);
  const key = ["users", userId, "match"];

  const { data, dataOnce, isLoading, error, mutate } = useFirestoreDoc(
    key,
    userRef,
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
