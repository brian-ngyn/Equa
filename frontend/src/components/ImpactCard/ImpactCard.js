import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";


import { db } from "../authentication/firebaseConfig"

const ImpactCard = (props) => {
  const {impacts} = props;
  return (
    <>
      <div className="w-9/12 h-24 grid grid-cols-6 mx-auto bg-backdrop rounded-xl p-2 m-2 mb-4">
        <div className="grid w-24 grid grid-cols-1 gap-4 place-content-center ml-3">
          <img src="/assets/charity1.svg" />
        </div>

        <div className="text-left rounded-md col-span-4">
          <p className="font-body text-xl text-typeface m-0">{impacts.charity_name}</p>
          <p className="font-body text-md text-typeface"> {impacts.activity_description}</p>
        </div>

        <div className="grid text-left rounded-md grid grid-cols-1 gap-4 place-content-center">
          <h1 className="font-body text-md text-typeface">{impacts.date}</h1>
        </div>

      </div>


    </>
  );
};

export default ImpactCard;