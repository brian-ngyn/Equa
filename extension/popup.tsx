import { useEffect, useState } from "react"
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"
import { Storage } from "@plasmohq/storage";

import { firebaseAuth, db } from "./firebase"
import { getDoc, setDoc, doc, DocumentData } from "firebase/firestore";
import GoogleButton from "react-google-button";

import logo from "data-base64:~assets/logo.png"

setPersistence(firebaseAuth, browserLocalPersistence)

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>(null)
  const [docSnap, setdocSnap] = useState<DocumentData>(undefined);

  const onLogoutClicked = async () => {
    if (user) {
      await firebaseAuth.signOut()
    }
  }
  const storage = new Storage();

  const onLoginClicked = () => {
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          await signInWithCredential(firebaseAuth, credential)
        } catch (e) {
          console.error("Could not log in. ", e)
        }
      }
    })
  }

  const getUserDB = async() => {
    const ref = doc(db, "user", user.uid);
    try {
      var response = await getDoc(ref);
      setdocSnap(response.data());
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setIsLoading(false);
      setUser(user);
    })
  }, [])

  async function setUserID () {
    // save to local storage
    await storage.set("equa_uid", user).then((res) => console.log("res", res)).catch((err) => console.log("err", err));
  }
  
  useEffect(() => {
    getUserDB()
    console.log(user);
    setUserID();
  }, [user]);

  if (isLoading){
    return (
      <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"450px",width:"100%"}}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 16, textAlign:"center", alignItems:"center", height:"450px"}}>
      <img src={logo} alt="logo" style={{width:"75%"}}></img>
      <h1 style={{
        color:"#ffffff",
        fontFamily: 'Fredoka One', 
        fontSize:"64px", 
        marginTop:"0", 
        marginBottom:"30px"}}>
          Equa
      </h1>
      {!user ? (
        <GoogleButton
          type="light"
          onClick={() => {
            setIsLoading(true)
            onLoginClicked()
          }}>
          Log in
        </GoogleButton>
      ) : (
        <button
          style={{
            backgroundColor:"#3c1518", 
            fontFamily:"Fredoka", 
            color:"#ffffff", 
            borderRadius:"20px", 
            borderStyle:"hidden",
            height:"45px",
            cursor:"pointer",
            width:"200px"
          }}
          onClick={() => {
            window.open('http://localhost:3000/dashboard','_blank')
          }}>
          View Dashboard
        </button>
      )}
      <div>
        {user ? (
          <button
            style={{
              backgroundColor:"rgba(0,0,0,0)", 
              fontFamily:"Fredoka", 
              color:"#ffffff", 
              borderStyle:"hidden",
              cursor:"pointer",
              paddingTop:"30px"
            }}
            onClick={() => {
              setIsLoading(true)
              onLogoutClicked()
            }}>
            Log Out
         </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IndexPopup
