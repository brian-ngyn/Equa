import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const Explore = () => {
  const navigate = useNavigate();
  var partners = new Set();
  var charities = new Set();

  const getPartners = async () => {
    const querySnapshot = await getDocs(collection(db, "partners"));
    partners.clear();
    querySnapshot.forEach((doc) => {
      partners.add(doc.data());
    });
    console.log(partners);
  }

  const getCharities = async () => {
    const querySnapshot = await getDocs(collection(db, "charities"));
    charities.clear();
    querySnapshot.forEach((doc) => {
      charities.add(doc.data());
    });
    console.log(charities);
  }

  getPartners();
  getCharities();

  return (
    <>
      <h1>Partners</h1>
      <div>The following companies are matching donations this month. Shop here to double your impact!</div>
    </>
  );
};

export default Explore;
