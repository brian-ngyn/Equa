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
    <div className="bg-secondary h-screen w-screen grid grid-cols-1 gap-4 place-content-center">
      <div className="">
        <div className="p-6 max-w-fit mx-auto flex">
          <img src="../../../assets/images/happyEarth.svg" alt="Happy Earth"/>
          <div className="text-left my-auto">
            <h2 className="font-title text-8xl text-additional my-4">Equa</h2>
            <h3 className="font-body font-bold text-5xl text-black my-4"> Giving back made easy </h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <div>
              <GoogleButton type="light" onClick={handleGoogleSignIn}/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;