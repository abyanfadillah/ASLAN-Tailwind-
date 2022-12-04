import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
 
} from 'firebase/auth';


import { auth } from './Firebase';
import { db } from './Firebase';
import {
  doc,
  setDoc,
  serverTimestamp
} from "@firebase/firestore";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});


  
  const createClientDB = ()=>{
    const uidClient = auth.currentUser.uid;
  return setDoc(doc(db, 'client', uidClient),{loginTerakhir: serverTimestamp()});
 
  } 
  
  

  const createUser = (email, password) => {
    return  createUserWithEmailAndPassword(auth, email, password);
  };


   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
    getRedirectResult().then(function(result){
      console.log(result.user.uid)
      setDoc(doc(db,'client',result.user.uid),{loginTerakhir:serverTimestamp})
    })
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{createClientDB, createUser, user, logout, signIn, googleSignIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
