import React from "react";

import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { useFirebaseApp } from "./FirebaseAppProvider";

const FirebaseAuthContext = React.createContext<Auth | undefined>(undefined);

type Props = {
  useEmulator?: boolean;
};
export function FirebaseAuthProvider({
  useEmulator,
  children,
}: React.PropsWithChildren<Props>) {
  const firebaseApp = useFirebaseApp();

  const firebaseAuth = React.useMemo(() => {
    const auth = getAuth(firebaseApp);
    if (useEmulator) {
      connectAuthEmulator(auth, "http://localhost:9099");
    }

    return auth;
  }, [useEmulator, firebaseApp]);

  return (
    <FirebaseAuthContext.Provider value={firebaseAuth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const firebaseAuth = React.useContext(FirebaseAuthContext);
  if (!firebaseAuth) {
    throw new Error(
      "useFirebaseAuth: context is undefined, please ensure the component is wrapped in a <FirebaseAuthProvider />"
    );
  }

  return firebaseAuth;
}
