import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

//const newPassword = getASecureRandomPassword();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mongoUser, setMongoUser] = useState(null);
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
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Function to update user's email
  const reauthenticateAndUpdateEmail = async (newEmail, currentPassword) => {
    const auth = getAuth(); // assuming you're using Firebase Auth
    const user = auth.currentUser;

    // ⚠️ Use the user's current email, not the new one
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Step 1: Re-authenticate
    await reauthenticateWithCredential(user, credential);

    // Step 2: Update email
    await updateEmail(user, newEmail);
  };

  const reauthenticateAndUpdatePassword = async (
    currentPassword,
    newPassword
  ) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
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
        const uid = currentUser.uid;
        const userInfo = { uid: currentUser.uid };

        axiosPublic
          .post("/jwt", userInfo, { withCredentials: true })
          .then(() => {
            // After JWT is set, fetch the MongoDB user
            return axios.get("http://localhost:5000/users", {
             params: { uid },
              withCredentials: true,
            });
          })
          .then((res) => {
            // Set the MongoDB user data
            setMongoUser(res.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        axiosPublic
          .post("/logout", {}, { withCredentials: true })
          .catch((error) => {
            console.error("Logout request failed:", error);
          })
          .finally(() => {
            setMongoUser(null);
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authValue = {
    user,
    mongoUser,
    setMongoUser,
    createUser,
    updateUserProfile,
    reauthenticateAndUpdateEmail,
    reauthenticateAndUpdatePassword,
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
