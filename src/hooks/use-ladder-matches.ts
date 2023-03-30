import {
  getDocs,
  collection,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useFirestore } from "../firebase";
import { ladderMatchSchema, type LadderMatch } from "../schema/ladder-match";
import { Schema } from "zod";

import useSWR from "swr";

const validateDocSnap = <T>(
  schema: Schema<T>,
  field: string | undefined,
  docSnap: DocumentSnapshot<DocumentData>
) => {
  if (docSnap.exists()) {
    const data = field ? docSnap.data()?.[field] : docSnap.data();
    schema.parse(data);
    return data as T;
  }
};

// TODO: use-firestore-docs.ts にする

export const useLadderMatches = () => {
  const firestore = useFirestore();
  const ladderMatchesRef = collection(firestore, "ladder_matches");

  const key = ["ladder_matches"];

  const fetcher = async () => {
    const docsSnapshot = await getDocs(ladderMatchesRef);
    const data = docsSnapshot.docs
      .map((doc) => validateDocSnap(ladderMatchSchema, undefined, doc))
      .filter((doc): doc is LadderMatch => !!doc);

    return data;
  };

  const { data: dataOnce, isLoading, error, mutate } = useSWR(key, fetcher);

  return {
    ladderMatchesOnce: dataOnce,
    isLoading,
    error,
    mutate,
  };
};
