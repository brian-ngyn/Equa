import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const Explore = () => {
  const navigate = useNavigate();
  var partners = new Set();

  const getPartners = async () => {
    const querySnapshot = await getDocs(collection(db, "partners"));
    querySnapshot.forEach((doc) => {
      partners.add(doc.data());
    });
    console.log(partners);
  }

  useEffect(() => {
    getPartners();
  }, [])

  return (
    <>
      <h1>Partners</h1>
      <div>The following companies are matching donations this month. Shop here to double your impact!</div>
    </>
  );
};

export default Explore;
