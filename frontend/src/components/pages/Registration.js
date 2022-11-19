import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/context/UserAuthContext";

const Registration = () => {
  const [error, setError] = useState("");
  const { getUserDB, user, docSnap } = useUserAuth();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>Equa</h2>
        <h3>Giving back made easy</h3>
        <h3>This is the page where you select the charities</h3>
        {error && <Alert variant="danger">{error}</Alert>}

      </div>
    </>
  );
};

export default Registration;