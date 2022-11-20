import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";


import { db } from "../authentication/firebaseConfig"

const ImpactCard = (props) => {
  console.log(props.impacts);
  const {impacts} = props;
  return (
    <>
      <div className="w-9/12 h-24 grid grid-cols-6 mx-auto bg-backdrop rounded-xl p-2 m-2 mb-4" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", marginBottom:"30"}}>
        <div className="grid w-24 grid grid-cols-1 gap-4 place-content-center ml-3">
          <img src={impacts.image} style={{
            maxWidth: 125
,            maxHeight: 95,
            paddingBottom: 0,
            paddingLeft:50,
          }}/>
        </div>

        <div className="text-left rounded-md col-span-4" style={{display:"flex", flexDirection:"column",justifyContent:"center"}}>
          <p className="font-body text-xl text-typeface m-0 font-extrabold">{impacts.charity_name}</p>
          <p className="font-body text-md text-typeface"> {impacts.activity_description}</p>
        </div>

        <div className="grid text-left rounded-md grid grid-cols-1 gap-4 place-content-center">
          <h1 className="font-body text-md text-typeface text-right mr-5 font-bold">{impacts.date}</h1>
        </div>

      </div>


    </>
  );
};

export default ImpactCard;