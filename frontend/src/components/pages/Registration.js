import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import { Box, typography } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../../components/authentication/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Axios from "axios";

import RenderCard from "../CauseCard.js";
import animalshelter from "../../AnimalShelters.svg";
import education from "../../Education.svg";
import food from "../../FoodScarcity.svg";
import homeless from "../../Homelessness.svg";
import human from "../../Humanitarianism.svg";
import poverty from "../../Poverty.svg";

const Registration = () => {
  const [error, setError] = useState("");
  const {
    user,
    causesStatus,
    docSnap,
    signup,
    logout,
    googleSignIn,
    makeUserDB,
    getUserDB,
  } = useUserAuth();
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      custom: {
        main: "#3c1518",
        contrastText: "#ffffff",
      },
    },
  });

  const [value, setValue] = React.useState({
    amount: "",
    creditCardNumber: "",
    cvc: "",
    date: "",
    postalCode: "",
  });

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const updateDB = async () => {
    const userRef = doc(db, "user", user.uid);
    const params = {
      credit_card_num: value.creditCardNumber,
      expiry_date: value.date,
      cvc: value.cvc,
      email: user.email,
      full_name: user.displayName,
    };
    Axios.get("http://localhost:3001/create-user", {
      params,
    }).then(async (response) => {
      if (response.data.customer && response.data.payment) {
        await updateDoc(userRef, {
          customer_id: response.data.customer.id,
          payment_id: response.data.payment.id,
        });
      } else {
        // need to handle this
      }
    });
    // need to handle if creating the customer and payments in stripe fail
    await updateDoc(userRef, {
      monthly_donation_goal: value.amount,
      cvc: value.cvc,
      credit_card_num: value.creditCardNumber,
      expiry_date: value.date,
      postal_code: value.postalCode,
      new_sign_up: false,

      animal_shelter: causesStatus.animal_shelter,
      education: causesStatus.education,
      food_scarcity: causesStatus.food_scarcity,
      homelessness: causesStatus.homelessness,
      humanitarianism: causesStatus.humanitarianism,
      poverty: causesStatus.poverty,
    });
    // don't navigate if these fail ^
    navigate("/dashboard");
  };

  return (
    <>
      <div className="bg-backdrop min-h-max min-w-max">
        <div>
          <div
            className="flex-inline pt-10"
            style={{
               marginLeft: 370
            }}
          >
            <h1 className="font-title text-typeface text-6xl text-left ">
              Create Account
            </h1>
            <h2 className="font-body text-typeface text-lg text-left">
              First, select some causes you're passionate about
            </h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div>
          <span class="inline-grid grid-cols-3 grid-rows-2 gap-2">
            <span>{RenderCard("homelessness", "Homelessness", homeless)}</span>
            <span>{RenderCard("education", "Education", education)}</span>
            <span>
              {RenderCard("animal_shelter", "Animal Shelters", animalshelter)}
            </span>
            <span>
              {RenderCard("humanitarianism", "Humanitarianism", human)}
            </span>
            <span>{RenderCard("Poverty", "Poverty", poverty)}</span>
            <span>{RenderCard("food_scarcity", "Food Scarcity", food)}</span>
          </span>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Box>
              <div class="m-1 inline-flex text-typeface font-body w-full justify-center">
                <div class="mt-5 mr-20">
                  Now, enter your monthly donation goal
                </div>
                <FormControl
                  sx={{ m: 1, ml: 11, width: "25ch" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                  color="custom"
                  id="outlined-adornment-amount"
                  value={value.amount}
                  onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  inputProps={ {min: 1 }}

                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "79ch" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-creditCardNumber">
                    Credit Card Number
                  </InputLabel>
                  <OutlinedInput
                  color="custom"
                  id="outlined-adornment-creditCardNumber"
                  value={value.creditCardNumber}
                  onChange={handleChange("creditCardNumber")}
                  label="Credit Card Number"
                  inputProps={{ maxLength: 16 }}

                  />
                </FormControl>
              </div>
              <div class="m-1 inline-flex">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-date">
                    Exp. Date
                  </InputLabel>
                  <OutlinedInput

                  color="custom"
                  id="outlined-adornment-date"
                  value={value.date}
                  onChange={handleChange("date")}
                  label="Exp. Date"
                  inputProps={{ maxLength: 4 }}
                  />
                  <FormHelperText id="outlined-expdate-helper-text">(MMYY)</FormHelperText>

                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-cvc">cvc</InputLabel>
                  <OutlinedInput
                    color="custom"
                    id="outlined-adornment-cvc"
                    value={value.cvc}
                    onChange={handleChange("cvc")}
                    label="cvc"
                  />
                  <FormHelperText id="outlined-cvc-helper-text">
                    (3 digits)
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-postalCode">
                    Postal Code
                  </InputLabel>
                  <OutlinedInput
                    color="custom"
                    id="outlined-adornment-postalCode"
                    value={value.postalCode}
                    onChange={handleChange("postalCode")}
                    label="Postal Code"
                  />
                </FormControl>
              </div>
              <div>
                <Button
                  color="custom"
                  variant="contained"
                  sx={{ m: 1 }}
                  onClick={updateDB}
                  className="w-1/2 h-14 border-0 rounded-full text-white text-body text-2xl"
                >
                  Create Account
                </Button>
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default Registration;
