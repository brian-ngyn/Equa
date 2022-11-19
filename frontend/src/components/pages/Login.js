import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const { user, docSnap, signup, logout, googleSignIn, makeUserDB, getUserDB } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    makeUserDB();
    getUserDB();
  }, [user, makeUserDB, getUserDB])

  useEffect(() => {
    if (docSnap != null){
      if (docSnap.new_sign_up){
        navigate("/create-account");
      } else {
        navigate("/dashboard");
      }
    }
  }, [docSnap, navigate])

  return (
    <>
      <div>

        <h2 >Equa</h2>
        <h3> Giving back made easy </h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <GoogleButton type="dark" onClick={handleGoogleSignIn}/>
        </div>
      </div>
    </>
  );
};

export default Login;