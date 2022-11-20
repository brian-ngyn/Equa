import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const ExplorePartners = (props) => {

  const [partners, setPartners] = useState([]);

  const getPartners = async () => {
    const querySnapshot = await getDocs(collection(db, "partners"));
    setPartners([]);
    querySnapshot.forEach((doc) => {
      setPartners((prev) => [...prev, doc.data()]);
    });
  }

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <>
      <Grid className="w-full mx-auto h-2/5 pt-5 grid grid-cols-3 gap-4 place-content-center">

        {partners.map((partner) => (
          <div key={partner.name} className="cursor-pointer grid w-2/3 grid-cols-1 gap-4 place-content-center">
            <a href={partner.link}><img src={partner.image} className={"h-full"} alt={partner.name} /></a>
          </div>

        ))}

      </Grid>
    </>
  );
};

export default ExplorePartners;