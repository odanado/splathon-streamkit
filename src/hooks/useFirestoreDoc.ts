import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { Schema } from "zod";

const validateDocSnap = (
  schema: Schema,
  field: string,
  docSnap: DocumentSnapshot<DocumentData>
) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    schema.parse(data?.[field]);
    return data?.[field];
  }
};

type Ref<T = DocumentData> = DocumentReference<T>;

export const useFirestoreDoc = <T>(
  key: string[],
  ref: Ref,
  schema: Schema<T>,
  field: string
) => {
  const fetcher = async () => {
    const docSnap = await getDoc(ref);
    return validateDocSnap(schema, field, docSnap);
  };

  const { data: dataOnce, isLoading, error, mutate } = useSWR(key, fetcher);

  const { data } = useSWRSubscription(key, (_key, { next }) => {
    const unsubscribe = onSnapshot(
      ref,
      (docSnap) => {
        next(null, validateDocSnap(schema, field, docSnap));
      },
      (error) => {
        next(error);
      }
    );
    return () => unsubscribe();
  });

  return {
    data,
    dataOnce,
    isLoading,
    error,
    mutate,
  };
};
