import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material";

import RenderCard from "../CauseCard.js";
import animalshelter from "../../AnimalShelters.svg";
import education from "../../Education.svg";
import food from "../../FoodScarcity.svg";
import homeless from "../../Homelessness.svg";
import human from "../../Humanitarianism.svg";
import poverty from "../../Poverty.svg";
import { Box } from "@mui/system";


const Registration = () => {
  
  const [value, setValue] = React.useState({
    amount:"",
    creditCardNumber:"",
    ccv:"",
    date:"",
    postalCode:"",
  });
  const handleChange = (prop) => (event) => {
    setValue({...value, [prop]: event.target.value});
  };
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
            </span>
        </div>
        <div>
          <Box className="mx-25">
            <div class="m-1 inline-flex">
              Now, enter your monthly donation goal 
              <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                fullWidth
                id="outlined-adornment-amount"
                value={value.amount}
                onChange={handleChange("amount")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth sx={{m:1}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-creditCardNumber">Credit Card Number</InputLabel>
                <OutlinedInput
                id="outlined-adornment-creditCardNumber"
                value={value.creditCardNumber}
                onChange={handleChange("creditCardNumber")}
                label="Credit Card Number"
                />
              </FormControl>
            </div>
            <div class="m-1 inline-flex">
              <FormControl sx={{m:1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-date">Exp. Date</InputLabel>
                <OutlinedInput
                fullWidth
                id="outlined-adornment-date"
                value={value.date}
                onChange={handleChange("date")}
                label="Exp. Date"
                />
                <FormHelperText id="outlined-expdate-helper-text">(MM/YY)</FormHelperText>
              </FormControl>
              <FormControl sx={{m:1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-ccv">CCV</InputLabel>
                <OutlinedInput
                fullWidth
                id="outlined-adornment-ccv"
                value={value.ccv}
                onChange={handleChange("ccv")}
                label="CCV"
                />
                <FormHelperText id="outlined-ccv-helper-text">(4 digits)</FormHelperText>
              </FormControl>
              <FormControl sx={{m:1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-postalCode">Postal Code</InputLabel>
                <OutlinedInput
                fullWidth
                id="outlined-adornment-postalCode"
                value={value.postalCode}
                onChange={handleChange("postalCode")}
                label="Postal Code"
                />
              </FormControl>
            </div>
          </Box>
        </div>
      

    </div>
      
    </>
  );
}


export default Registration;