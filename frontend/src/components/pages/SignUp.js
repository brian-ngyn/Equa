import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "@mui/material";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";

const SignUp = () => {
  const [error, setError] = useState("");
  const { googleSignIn, user } = useUserAuth();
  let navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <h2>Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <GoogleButton type="dark" onClick={handleGoogleSignIn}/>
        </div>
        
        <div className="p-4 box mt-3 text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;