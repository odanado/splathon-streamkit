import React from "react";

import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import { useFirebaseApp } from "./FirebaseAppProvider";

const FirestoreContext = React.createContext<Firestore | undefined>(undefined);

type Props = {
  useEmulator?: boolean;
};
export function FirestoreProvider({
  useEmulator,
  children,
}: React.PropsWithChildren<Props>) {
  const firebaseApp = useFirebaseApp();

  const firestore = React.useMemo(() => {
    const firestore = getFirestore(firebaseApp);
    if (useEmulator) {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }

    return firestore;
  }, [useEmulator, firebaseApp]);

  return (
    <FirestoreContext.Provider value={firestore}>
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestore() {
  const firestore = React.useContext(FirestoreContext);
  if (!firestore) {
    throw new Error(
      "useFirestore: context is undefined, please ensure the component is wrapped in a <FirestoreProvider />"
    );
  }

  return firestore;
}
