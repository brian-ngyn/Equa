import { React, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../authentication/firebaseConfig";
import { useLocation } from "react-router-dom";

function CharityPage() {
  const [activities, setActivities] = useState([]);

  const { state } = useLocation();
  const { charity } = state; // Read values passed on state

  const getActivities = async (charity) => {
    setActivities([]);
    const activites = await getDocs(
      query(collection(db, "activities"), where("charity_name", "==", charity.name))
    );
    activites.forEach((activity) => {
      setActivities((prev) => [...prev, activity.data()]);
    });
  };

  useEffect(() => {
    setActivities([]);
    getActivities(charity);
  }, []);

  useEffect(() => {
    console.log(activities)
  }, [activities])

  return (
    <>
      <div className="bg-backdrop h-screen w-screen p-20" style={{paddingLeft:"15rem", paddingRight:"15rem"}}>
        <NavBar />
        <div className="my-auto mx-auto p-20">
          <div className="flex justify-left">
            <img
              src={charity.image}
              alt={charity.name}
              className="max-w-md max-h-80"
            />
            <h1 className="font-title font-bold text-5xl text-primary text-left my-auto ml-10">
              {charity.name}
            </h1>
          </div>
          <p className="font-body font-semibold text-left mt-5">
            {charity.description}
          </p>
          <h2 className="font-title font-bold text-4xl text-primary text-left my-5">
            Activity
          </h2>
          {activities.map((activity) => (
            <div className="flex my-3">
              <img src="../../../assets/images/Checkmark.svg" alt="Checkmark" />
              <p className="font-body ml-5 mr-2 text-left">{activity.activity_description} </p>
              <p className="font-body ml-auto text-right">{activity.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CharityPage;
