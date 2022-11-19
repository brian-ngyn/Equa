import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const DashboardDetails = () => {
  const { googleSignIn, makeUserDB, getUserDB, user, docSnap, logout } = useUserAuth();
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
      <Grid className="bg-secondary h-3/5 p-2 top-1/4">
        <div className="w-4/5 mx-auto top-1/4">
            <div className="grid h-4/6 text-left p-12">
              <h1 className="font-title text-4xl text-white">Your Impact</h1>
              <h1 className="font-body text-md text-white">100% of every donation you make goes straight to the selected charity.  View the activity of charities you’ve donated to below - they couldn’t have done this without you!</h1>
            </div>

        </div>

      </Grid>
    </>
  );
};

export default DashboardDetails;