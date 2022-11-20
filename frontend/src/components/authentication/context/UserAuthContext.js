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
    const [user, setUser] = useState(null);
    const [docSnap, setdocSnap] = useState(null);
    const causesStatus = {
        animal_shelter: false,
        education: false,
        food_scarcity: false,
        homelessness: false,
        humanitarianism: false,
        poverty: false
    }

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

    async function makeUserDB(){
        if (user != null){
            try {
                const ref = doc(db, "user", user.uid);
                // check to see if user already exists 
                var docSnap = await getDoc(ref);
                if (!docSnap.exists()){
                    const docRef = setDoc(ref, { new_sign_up: true, total_donated: 0, homelessness: false, 
                                                    education: false, animal_shelter: false, humanitarianism: false, 
                                                    poverty: false, food_scarcity: false, monthly_donation_goal: 0,
                                                    credit_card_num: 0, cvc: 0, expiry_date: 0, postal_code: "",
                                                    customer_id: "", payment_id: ""
                                                });
                    console.log("User doccument written");
                }
                else {
                    console.log("User document already exists");
                }
            } catch (e) {
                console.error("Error while adding user document: ", e);
            }
        }
    }

    async function getUserDB(){
        if (user != null){
            const ref = doc(db, "user", user.uid);
            try {
              var response = await getDoc(ref);
              setdocSnap(response.data());
            } catch (error) {
              console.log(error);
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <userAuthContext.Provider value={{ user, docSnap, causesStatus, signup, logout, googleSignIn, makeUserDB, getUserDB }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}