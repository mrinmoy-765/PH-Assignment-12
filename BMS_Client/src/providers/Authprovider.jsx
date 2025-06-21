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
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

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

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     // Set the Firebase user state immediately
  //     setUser(currentUser);

  //     if (currentUser) {
  //       // --- LOGGED-IN LOGIC ---
  //       const userInfo = { email: currentUser.email };

  //       // Start the promise chain
  //       axiosPublic
  //         .post("/jwt", userInfo, { withCredentials: true })
  //         .then(() => {
  //           // After JWT is set, fetch the MongoDB user.
  //           // IMPORTANT: Return the next promise so the chain continues.
  //           return axios.get("http://localhost:5000/users", {
  //             params: { email: currentUser.email },
  //             withCredentials: true,
  //           });
  //         })
  //         .then((res) => {
  //           // Once the MongoDB user is fetched, set that state.
  //           setMongoUser(res.data);
  //         })
  //         .catch((error) => {
  //           // It's good practice to handle potential errors
  //           console.error("Error fetching user data:", error);
  //         })
  //         .finally(() => {
  //           // This will run after the chain completes, whether it succeeded or failed.
  //           // This is the correct place to stop the loading indicator.
  //           setLoading(false);
  //         });
  //     } else {
  //       // --- LOGGED-OUT LOGIC ---
  //       axiosPublic
  //         .post("/logout", {}, { withCredentials: true })
  //         .catch((error) => {
  //           console.error("Logout request failed:", error);
  //         })
  //         .finally(() => {
  //           // Clear any stale user data and stop loading
  //           setMongoUser(null);
  //           setLoading(false);
  //         });
  //     }
  //   });

  //   // Cleanup subscription on component unmount
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [axiosPublic]); // Dependency array

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };

        axiosPublic
          .post("/jwt", userInfo, { withCredentials: true })
          .then(() => {
            // After JWT is set, fetch the MongoDB user
            return axios.get("http://localhost:5000/users", {
              params: { email: currentUser.email },
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
