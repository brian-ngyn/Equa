import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const Home = () => {
  const { user, logout } = useUserAuth();
  const [ docSnap, setdocSnap] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDB = async() => {
    const ref = doc(db, "user", user.uid);
    try {
      var response = await getDoc(ref);
      setdocSnap(response.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserDB();
  }, []);

  return (
    <>
      <div>Hi it works</div>
      <div>User id: {user.uid}</div>
      <div>user contents: {JSON.stringify(docSnap)}</div>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
};

export default Home;