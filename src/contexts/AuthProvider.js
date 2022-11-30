import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext();
const auth=getAuth(app)
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
      setLoading(false);
      return createUserWithEmailAndPassword(auth, email, password);
  };
    const popupSignIn = (provider) => {
      setLoading(false);
      return signInWithPopup(auth, provider);
    };
       useEffect(() => {
         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           setLoading(false);
         });
         return () => {
           unsubscribe();
         };
       });

  const signIn = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
        const updateUserProfile = (profile) => {
          return updateProfile(auth.currentUser, profile);
        };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    popupSignIn,
    logOut,
    updateUserProfile,
  };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;