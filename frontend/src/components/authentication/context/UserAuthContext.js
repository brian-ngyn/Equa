import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState("");
    function signup(email, password){
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    function logout(){
        return signOut(firebaseAuth);
    }
    
    function googleSignIn(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(firebaseAuth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser != null){
                try {
                    const ref = doc(db, "user", currentUser.uid);
                    // check to see if user already exists 
                    var docSnap = await getDoc(ref);
                    if (!docSnap.exists()){
                        const docRef = setDoc(ref, { field1: "testing1", field2: "testing2", field3: "testing3"});
                        console.log("User doccument written");
                    }
                    else {
                        console.log("User document already exists");
                    }
                } catch (e) {
                    console.error("Error while adding user document: ", e);
                }
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <userAuthContext.Provider value={{ user, signup, logout, googleSignIn }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}