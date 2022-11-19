import { useEffect, useState } from "react"
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"

import { firebaseAuth, db } from "./firebase"
import { getDoc, setDoc, doc, DocumentData } from "firebase/firestore";

setPersistence(firebaseAuth, browserLocalPersistence)

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)
  const [docSnap, setdocSnap] = useState<DocumentData>(undefined);

  const onLogoutClicked = async () => {
    if (user) {
      await firebaseAuth.signOut()
    }
  }

  const onLoginClicked = () => {
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        setIsLoading(false)
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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  useEffect(() => {
    getUserDB()
  }, [user])

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 16}}>
      <h1>App</h1>
      {!user ? (
        <button
          onClick={() => {
            setIsLoading(true)
            onLoginClicked()
          }}>
          Log in
        </button>
      ) : (
        <button
          onClick={() => {
            setIsLoading(true)
            onLogoutClicked()
          }}>
          Log out
        </button>
      )}
      <div>
        {isLoading ? "Loading..." : ""}
        {!!user ? (
          <div>
            Hi it works, {user.displayName} your email address is{" "}
            {user.email}, firebase user id is {user.uid}
            value of some default_field: {JSON.stringify(docSnap)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IndexPopup
