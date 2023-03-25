import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

export const Firebase = ({ children }: { children: React.ReactNode }) => {
  const app = useFirebaseApp();
  const db = getFirestore(app);

  connectFirestoreEmulator(db, "localhost", 8080);

  return <FirestoreProvider sdk={db}>{children}</FirestoreProvider>;
};
