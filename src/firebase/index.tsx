export * from "./FirebaseProvider";

import { FirebaseOptions } from "firebase/app";
import { FirebaseAppProvider } from "./FirebaseProvider";
import { FirestoreProvider } from "./FirestoreProvider";

export { useFirebaseApp } from "./FirebaseProvider";
export { useFirestore } from "./FirestoreProvider";

type Props = {
  firebaseOptions: FirebaseOptions;
  useEmulator?: boolean;
};

export const Firebase = ({
  firebaseOptions,
  useEmulator,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <FirebaseAppProvider firebaseOptions={firebaseOptions}>
      <FirestoreProvider useEmulator={useEmulator}>
        {children}
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
};
