import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import ExplorePartners from "../ExplorePartners/ExplorePartners";
import {Grid} from "@mui/material";

import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"
import ExploreCharities from "../ExploreCharities/ExploreCharities";
import NavBar from "../NavBar/NavBar";
const Explore = () => {

  

  return (
    <>
      
      <div className="bg-backdrop h-screen">
        <Grid className="w-4/5 mx-auto h-2/5 pt-10 text-left" style={{maxWidth: 750, maxHeight: 195}}>
          <NavBar />
          <h1 className="font-title text-3xl text-primary">Partners</h1>
          <p className="font-body text-lg text-typeface">The following companies are matching donations this month. Shop here to double your impact!</p>
          <ExplorePartners/>
          <br/><br/>
          <h1 className="font-title text-3xl text-primary">Browse Charities</h1>
          <ExploreCharities/>
        </Grid>
      </div>
      
    </>
  );
};

export default Explore;
