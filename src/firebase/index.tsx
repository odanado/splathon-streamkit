import { FirebaseOptions } from "firebase/app";
import { FirebaseAppProvider } from "./FirebaseAppProvider";
import { FirebaseAuthProvider } from "./FirebaseAuthProvider";
import { FirestoreProvider } from "./FirestoreProvider";

export { useFirebaseApp } from "./FirebaseAppProvider";
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
        <FirebaseAuthProvider useEmulator={useEmulator}>
          {children}
        </FirebaseAuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
};
