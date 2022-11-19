import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const { googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();

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
        <h2 >Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <GoogleButton type="dark" onClick={handleGoogleSignIn}/>
        </div>

        <div className="p-4 box mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;