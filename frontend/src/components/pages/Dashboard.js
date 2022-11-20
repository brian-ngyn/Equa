import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardDetails from "../DashboardDetails/DashboardDetails";

const Dashboard = () => {
  const { googleSignIn, makeUserDB, getUserDB, user, docSnap, logout } = useUserAuth();

  useEffect(() => {
    if (docSnap && !docSnap.monthly_donation_goal){
      getUserDB();
    }
    
  }, [docSnap]);
  return (
    <>
        <div className="h-screen">
          <DashboardHeader user={user} logout={logout} />
          <DashboardDetails user={user} />
        </div>
    </>
  );
};

export default Dashboard;