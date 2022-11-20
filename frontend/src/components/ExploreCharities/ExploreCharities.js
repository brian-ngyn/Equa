import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"
import CharityCard from "../CharityCard/CharityCard";

const ExploreCharities = (props) => {

  const [charities, setCharities] = useState([]);

  const getCharities = async () => {
    const querySnapshot = await getDocs(collection(db, "charities"));
    setCharities([]);
    querySnapshot.forEach((doc) => {
      setCharities((prev) => [...prev, doc.data()]);
    });
  }

  useEffect(() => {
    getCharities();
  }, []);


  return (
    <>
      
      {charities.map((charity) => (
        <CharityCard key={charity.name} charity={charity} />
      ))}

    </>
  );
};

export default ExploreCharities;