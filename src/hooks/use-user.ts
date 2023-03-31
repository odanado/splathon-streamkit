import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebaseAuth } from "../firebase/FirebaseAuthProvider";

export type User = {
  id: string;
  email: string;
};

export const useUser = () => {
  const auth = useFirebaseAuth();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      if (!user.email) {
        throw new Error("User has no email");
      }

      setUser({
        id: user.uid,
        email: user.email,
      });
    });

    return () => unsubscribe();
  }, [auth]);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return {
    user,
    signIn,
  };
};
