import { React, useEffect, useState } from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { db } from "../authentication/firebaseConfig";

const CharityCard = (props) => {
  const { charity } = props;
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full cursor-pointer h-28 grid grid-cols-5 mx-auto bg-backdrop drop-shadow-xl rounded-xl p-2 m-2 mb-4 place-content-center"
        onClick={() => {
          navigate("/charity", { state: { charity } });
        }}
      >
        <div className="grid w-24 grid col-span-1 gap-4 place-content-center ml-3">
          <img src={charity.image} />
        </div>

        <div className="text-left rounded-md col-span-4 pt-2">
          <p className="font-body text-2xl text-typeface m-0">{charity.name}</p>
          <p className="font-body text-md text-typeface pt-2">
            {" "}
            {charity.category}
          </p>
        </div>
      </div>
    </>
  );
};

export default CharityCard;
