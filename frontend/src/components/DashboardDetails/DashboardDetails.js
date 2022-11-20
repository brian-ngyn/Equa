import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";


import { db } from "../authentication/firebaseConfig"
import ImpactCard from "../ImpactCard/ImpactCard";


const DashboardDetails = (props) => {
  const { user } = props;
  const [impacts, setImpacts] = useState([]);

  const getActivities= async (user_charities) => {
    setImpacts([]);
    user_charities.forEach(async (charity) => {
      const activites = await getDocs(query(collection(db, "activities"), where("charity_name", "==", charity)));
      activites.forEach((activity) => {
        setImpacts((prev) => [...prev, activity.data()]);
      });
    })
  }

  const getDonations = async () => {
    let  user_charities = [];
    const donations = await getDocs(query(collection(db, "donations"), where("user_id", "==", user.uid)));

     donations.forEach((doc) => { user_charities.push(doc.data().charity) });
    getActivities(user_charities);
  }

  
  useEffect(() => {
    setImpacts([]);
    if (user) {
      getDonations();
    }
  }, [user.uid]);

  return (
    <>
      <Grid className="bg-secondary h-full p-2 top-1/4">
        <div className="w-4/5 mx-auto top-1/4">
          <div className="grid h-4/6 text-left p-6">
            <h1 className="font-title text-4xl text-white">Your Impact</h1>
            <h1 className="font-body text-lg text-white">100% of every donation you make goes straight to the selected charity.  View the activity of charities you’ve donated to below - they couldn’t have done this without you!</h1>
          </div>


        </div>
        {impacts.map((impact, index) => (
          index < 6 && <ImpactCard key={index} impacts={impact} /> 

        ))}
        

      </Grid>
    </>
  );
};

export default DashboardDetails;