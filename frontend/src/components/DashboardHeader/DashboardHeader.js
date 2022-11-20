import { React, useEffect, useState }from "react";
import { useUserAuth } from "../authentication/context/UserAuthContext";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from "react-router";
import {Grid} from "@mui/material";
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar/NavBar";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig"

const DashboardHeader = (props) => {
  const {user, logout } = props;
  let { docSnap } = useUserAuth();
  const navigate = useNavigate();
  const[progress, setProgress] = useState({current:0 ,goal:0});

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setProgress({current:docSnap.total_donated, goal:docSnap.monthly_donation_goal});
  }, [docSnap]);


  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.mode === 'light' ? '#3c1518' : '#308fe8',
    },
  }));

  return (
    <>
      <Grid className="bg-backdrop h-2/5 p-2 grid grid-cols-1 gap-4 place-content-center">
        <div className="w-4/5 mx-auto">
          <NavBar />
          <Grid container className="mx-auto" style={{display:"flex", alignItems:"center"}}>
            <div className="grid h-4/6 w-1/5 grid grid-cols-1 gap-4 place-content-center" style={{display:"flex",justifyContent:"flex-end"}}>
              <img src="/assets/images/happyEarth.png" className={"h-full"} alt="Test"/>
            </div>
            <div className="h-4/6 w-4/5 text-left grid grid-cols-1 gap-4 place-content-center p-10">
              <h1 className="font-title text-5xl text-primary">Welcome Back, {user.displayName}</h1>
              <h1 className="font-body text-lg text-typeface">Your monthly donations</h1>
              <span className="grid grid-cols-2 w-full">
                <BorderLinearProgress variant="determinate" style={{height:"100%"}} value={progress.current/progress.goal*100} />
                <p className="ml-3 text-lg text-typeface font-body">${progress.current} / ${progress.goal}</p>
              </span>
            </div>
              
          </Grid>
        </div>
      
      </Grid>
    </>
  );
};

export default DashboardHeader;