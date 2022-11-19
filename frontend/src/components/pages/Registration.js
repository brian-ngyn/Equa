import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { FormControl } from "@mui/material";

import RenderCard from "../CauseCard.js";
import animalshelter from "../../AnimalShelters.svg";
import education from "../../Education.svg";
import food from "../../FoodScarcity.svg";
import homeless from "../../Homelessness.svg";
import human from "../../Humanitarianism.svg";
import poverty from "../../Poverty.svg";


const Registration = () => {
  
  const [selected, setSelected] = React.useState(false);
  const [error, setError] = useState("");
  const { user, docSnap, signup, logout, googleSignIn, makeUserDB, getUserDB } = useUserAuth();
  const navigate = useNavigate();
  
  return (
    <>
    <div className='bg-backdrop h-screen w-screen'>
      <div>
          <h1 className="font-title text-typeface text-2xl"
          align='flex-start'>
            Create Account
            </h1>
          <h2 className="font-body text-typeface">First, select some causes you're passionate about</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div>
          <span class="inline-grid grid-cols-3 grid-rows-2 gap-2"
          >
              <span>
                {RenderCard("Homeless", homeless)}
              </span>
              <span>
                {RenderCard("Education", education)}
              </span>
              <span>
                {RenderCard("Animals", animalshelter)}
              </span>
              <span>
                {RenderCard("Humanitarianism", human)}
              </span>
              <span>
                {RenderCard("Poverty", poverty)}
              </span>
              <span>
                {RenderCard("Food Scarcity", food)}
              </span>
              <span>
                
              </span>
            </span>
        </div>
        <div>
          <span className="inline">
            Now, enter your monthly donation goal 
            
          </span>
        </div>
      

    </div>
      
    </>
  );
}


export default Registration;