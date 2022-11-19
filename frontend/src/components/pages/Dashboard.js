import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const Dashboard = () => {
  const { user, docSnap, signup, logout, googleSignIn, makeUserDB, getUserDB } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

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

export default Dashboard;