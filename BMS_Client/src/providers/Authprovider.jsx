import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


import {
   GoogleAuthProvider, 
   createUserWithEmailAndPassword, 
   getAuth, onAuthStateChanged, 
   signInWithEmailAndPassword, 
   signInWithPopup, 
   signOut, 
   updateProfile
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

   const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
    }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo, { withCredentials: true })
          .then(() => {
            setLoading(false);
          });
      } else {
        axiosPublic
          .post("/logout", {}, { withCredentials: true })
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authValue = {
    user,
    firebaseUser,
    setFirebaseUser,
    createUser,
    updateUserProfile,
    signIn,
    googleSignIn,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
