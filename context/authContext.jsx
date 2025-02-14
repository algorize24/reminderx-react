import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase/firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

// -- context section --

// create a context
const AuthContext = createContext();

// custom hook for easy access to the context
export const useAuth = () => useContext(AuthContext);

// main component
export default function AuthContextProvider({ children }) {
  // user state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsEmailVerified(currentUser.emailVerified); // Track email verification
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        await signOut(auth);
        const error = new Error("Email is not verified");
        error.code = "auth/email-not-verified";
        throw error;
      }
    } catch (error) {
      console.error("Sign In failed...", error);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user); // Send verification email
      return userCredential; // Continue with your sign-up process
    } catch (error) {
      console.error("Sign Up failed...", error);
      throw error;
    }
  };
  // sign out the user
  const logOut = async () => {
    try {
      setUser(null); // Explicitly set user to null after sign-out
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed...", error);
    }
  };

  // value to pass in provider
  const value = {
    user,
    loading,
    signIn,
    signUp,
    logOut,
    isEmailVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
