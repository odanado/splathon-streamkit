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

const validateDocSnap = <T>(
  schema: Schema<T>,
  field: string,
  docSnap: DocumentSnapshot<DocumentData>
) => {
  if (docSnap.exists()) {
    const data = docSnap.data()?.[field];
    schema.parse(data);
    return data as T;
  }
};

type Ref<T = DocumentData> = DocumentReference<T>;

export const useFirestoreDoc = <T>(
  key: string[] | undefined,
  getRef: () => Ref,
  schema: Schema<T>,
  field: string
) => {
  const fetcher = async () => {
    const ref = getRef();
    const docSnap = await getDoc(ref);
    return validateDocSnap(schema, field, docSnap);
  };

  const { data: dataOnce, isLoading, error, mutate } = useSWR(key, fetcher);

  const { data } = useSWRSubscription(key, (_key, { next }) => {
    const ref = getRef();
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
  }) as { data: T };
  // TODO: 型定義を頑張る

  return {
    data,
    dataOnce,
    isLoading,
    error,
    mutate,
  };
};
