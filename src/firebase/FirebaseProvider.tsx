import React from "react";
import { getApps, initializeApp } from "firebase/app";
import type { FirebaseApp, FirebaseOptions } from "firebase/app";

// https://github.com/firebase/firebase-js-sdk/blob/eb049456555122e2a7350449b42ac07b8de175f7/packages/app/src/constants.ts#L49
const DEFAULT_ENTRY_NAME = "[DEFAULT]";

const FirebaseAppContext = React.createContext<FirebaseApp | undefined>(
  undefined
);

type Props = {
  firebaseOptions: FirebaseOptions;
};

export function FirebaseAppProvider({
  firebaseOptions,
  children,
}: React.PropsWithChildren<Props>) {
  const firebaseApp: FirebaseApp = React.useMemo(() => {
    const existingApp = getApps().find(
      (app) => app.name === DEFAULT_ENTRY_NAME
    );
    if (existingApp) {
      return existingApp;
    }

    return initializeApp(firebaseOptions);
  }, [firebaseOptions]);

  return (
    <FirebaseAppContext.Provider value={firebaseApp}>
      {children}
    </FirebaseAppContext.Provider>
  );
}

export function useFirebaseApp() {
  const firebaseApp = React.useContext(FirebaseAppContext);
  if (!firebaseApp) {
    throw new Error(
      "useFirebaseApp: context is undefined, please ensure the component is wrapped in a <FirebaseAppProvider />"
    );
  }

  return firebaseApp;
}
