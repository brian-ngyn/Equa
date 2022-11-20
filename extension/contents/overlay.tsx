import checkmark from "data-base64:~assets/Checkmark.svg";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import logo from "data-base64:~assets/logo.png"
import x from "data-base64:~assets/x.png"
import fail from "data-base64:~assets/fail.png"
import green_check from "data-base64:~assets/green_check.png"
import cssText from "data-text:~/contents/styling.css"
import type { User } from "firebase/auth"
import { Storage } from "@plasmohq/storage";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, DocumentData } from "firebase/firestore";
import type { PlasmoContentScript } from "plasmo"
import Axios from "axios";
import { firebaseAuth, db } from "../firebase"
import checkoutUrls from "./stores.js"
export const config: PlasmoContentScript = {
    matches: ["https://*/*"],
    css: ["font.css"]
}

const storage = new Storage();
export const getStyle = () => {
    const style = document.createElement("style");
    style.textContent = cssText;
    return style;
};

const PlasmoInline = () => {
    const [donationAmount, setdonationAmount] = useState("2");
    const [display, setDisplay] = useState(false);
    const [docSnap, setdocSnap] = useState<DocumentData>(undefined);
    const [user, setUser] = useState(null);
    const [selected, setSelected] = useState("");
    const [charities, setCharities] = useState([]);
    const [close, setClose] = useState(true);
    const [status, setStatus] = useState("");
    const [processing, setProcessing] = useState(false);

    const getCharities = async () => {
      const querySnapshot = await getDocs(collection(db, "charities"));
      const causesMap = {
          "Education": "education",
          "Poverty": "poverty",
          "Food Scarcity": "food_scarcity",
          "Homelessness": "homelessness",
          "Humanitarianism": "humanitarianism",
          "Animals": "animal_shelter"
      }
      setCharities([]);
      querySnapshot.forEach((doc) => {
          const property = causesMap[doc.data().category];
          if (docSnap[property]){
              setCharities((prev) => [...prev, doc.data()]);
          }
        console.log("charity", doc.data())

      });
      setClose(false);
    }

    useEffect(() => {
        getCharities();
      }, [docSnap]);

    const getUserDB = async (equa_uid) => {
        if (equa_uid) {
            try {
                const ref = doc(db, "user", equa_uid.uid);
                var response = await getDoc(ref);
                setdocSnap(response.data());
                console.log("user", response.data())
            } catch (error) {
                console.error("Doc", error);
            }
        }
    }

    useEffect(() => {
        // fetch UID from the local storage
        storage.get("equa_uid").then(
            (equa_uid) => {
                getUserDB(equa_uid);
                setUser(equa_uid);
                console.log(equa_uid);
            },
            // if there are no tasks, set an empty array
            // this usually gets triggered if the method fails or returns an error
            (() => console.log("Get UID Error"))
        );

        // Determine if it is checkout;
        checkoutUrls.some(element => {
            if (window.location.href.toLowerCase().includes(element.toLowerCase())) {
                setDisplay(true);
            }
        })


    },
        [] // run once on moun[]
    );
    const renderPartnerLabel = () => {
        const partners = ["sportchek", "walmart", "marks"];
        const totValue = parseFloat(donationAmount) * 2;
        let isPartner = false;
        // Determine if it is checkout;
        partners.some(element => {
            if (window.location.href.toLowerCase().includes(element.toLowerCase())) {
                isPartner = true;
            }
        })
        if (!isPartner) {
            return null
        }
        return (
            <div style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "10px" }}>
                <strong>
                    Your donation will be matched for a total donation of ${totValue}!
                </strong>
            </div>
        )
    }

    const renderCard = (name, image, description) => {
        return (
            <Grid
                item
                xs={6}
                className="card"
                style={{
                    height: "100px",
                    backgroundColor: "#FDF8EF",
                    borderRadius: "20px",
                    border: `${selected == name ? "3" : "1"}px solid #3C1518`,
                    padding: "20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                    display: "flex",
                    color:"#3C1518"
                }}
                onClick={() => {
                    setSelected(name);
                }}
            >
                <img
                    src={image}
                    style={{ height: "100%" }}
                    className="cover"
                ></img>
                <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
                    <p className="cover" style={{ paddingLeft: "15px", fontFamily: "sans-serif", fontWeight: "600" }}>{name}</p>
                    {selected == name ? (
                        <img
                            src={checkmark}
                            alt="checkmark"
                            className="cover"
                            style={{
                                position: "absolute",
                                right: "5px",
                                top: "5px",
                                filter:
                                    ": invert(5%) sepia(40%) saturate(4907%) hue-rotate(340deg) brightness(107%) contrast(89%)",
                            }}
                        />
                    ) : null}
                    <p className="description">{description}</p>
                </div>
            </Grid>
        );
    };

    const sendReq = () => {
        setProcessing(true);
        const params = {
            donationAmount: donationAmount,
            charity: selected,
            email: user.email,
            docSnap: docSnap
        };
        Axios.get("http://localhost:3001/donate", {
            params
        }).then(async (res) => {
            if (res.data.status == "succeeded") {
                console.log("payment worked");
                setStatus("success");
                const userRef = doc(db, "user", user.uid);
                await updateDoc(userRef, {
                    total_donated: (parseInt(docSnap.total_donated) + parseInt(donationAmount)).toString(),
                });
                const addDocRef = await addDoc(collection(db, "donations"), {
                    amount: donationAmount,
                    charity: selected,
                    user_id: user.uid
                  });
            } else {
                // need to do some handling for that
                console.log("payment failed");
                setStatus("fail")
            }
            setProcessing(false);
        })
    }

    if (close){
        return
    }

    if (status==="success"){
        return(
            <div className="container">
                <div style={{
                    display: "flex",
                    width: "100%",
                    gap:"20px",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    height:"100%"
                }}>
                    <img src={green_check} style={{width:"100px", height:"100px"}}></img>
                    Thank you for donating!
                </div>
                <img src={x} style={{position:"absolute", top:"20px", left:"20px", width:"10px", height:"10px"}} onClick={()=>{setClose(true)}}></img>
            </div>
        )
    }

    if (status==="fail"){
        return(
            <div className="container">
                <div style={{
                    display: "flex",
                    width: "100%",
                    gap:"20px",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    height:"100%"
                }}>
                    <img src={fail} style={{width:"100px", height:"100px"}}></img>
                    Could not process donation
                </div>
                <img src={x} style={{position:"absolute", top:"20px", left:"20px", width:"10px", height:"10px"}} onClick={()=>{setClose(true)}}></img>
            </div>
        )
    }

    return (
        user && display &&
        <div className="container">
            <div style={{
                display: "flex",
                width: "100%",
            }}>
                <img src={logo}></img>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <h1 style={{
                        marginBottom: "0",
                        color: "#1C6758"
                    }}>
                        Hi, {user.displayName}
                    </h1>
                    
                    {docSnap &&
                    <>
                    <p style={{
                        marginTop: "10px",
                    }}>
                        Your monthly donations
                    </p>

                    <strong style={{
                        marginTop: "0",
                        color:"#3C1518"
                    }}>
                        ${docSnap.total_donated}/${docSnap.monthly_donation_goal}
                    </strong>
                    </>}
                </div>
            </div>
            {!docSnap && 
                        <div style={{paddingTop: 20, textAlign:"center", alignItems:"center", alignContent:"center"}}>
                        <p style={{color:"#3C1518"}}>We would like to learn more about your top charities so we can maximise your contributions. Click the button below to finish the process, and then reload this page.  </p>
                        <button style={{
                            backgroundColor:"#3c1518", 
                            fontFamily:"sans-serif", 
                            color:"#ffffff", 
                            borderRadius:"10px", 
                            borderStyle:"hidden",
                            height:"35px",
                            cursor:"pointer"
                        }}
                        onClick={() => {
                            window.open('http://localhost:3000/dashboard','_blank')
                        }}>
                        Finish Signup
                        </button>
                        </div>
                        }
            {docSnap &&
            <>
            <p style={{ paddingLeft: "10px"}}>
                You’re ${docSnap.monthly_donation_goal - docSnap.total_donated} away from your monthly goal - would you like to make a donation to one of the charities below?
            </p>
            <Grid container spacing={2}>
                {charities.map((charity) =>
                    renderCard(charity.name, charity.image, charity.description)
                )}
            </Grid>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <span>
                    Enter Donation Amount
                </span>
                <input
                    type="text"
                    onChange={(event) => {
                        setdonationAmount(event.target.value);
                    }}
                    value={donationAmount}
                    style={{
                        height: "30px",
                        outline: "none",
                        backgroundColor: "#fdf8ef",
                        borderRadius: "5px",
                        border: "1px solid rgb(60, 21, 24)",
                        textAlign: "right",
                        paddingRight: "10px"
                    }}
                />
            </div>
            {renderPartnerLabel()}
            <div style={{ "width": "100%", "textAlign": "center", "paddingTop": "20px", "paddingBottom": "20px" }}>
                <button style={{
                    width: "40%",
                    height: "50px",
                    backgroundColor: "#1C6758",
                    borderStyle: "hidden",
                    color: "#ffffff",
                    borderRadius: "20px",
                    fontSize: "24px",
                    cursor: "pointer",
                }}
                onClick={sendReq} 
                disabled={(selected===""||!donationAmount)}
                >
                    Donate!
                </button>
            </div>
            {processing &&
                <div style={{textAlign:"center"}}>
                    Processing...
                </div>
            }
            </>}
            <img src={x} style={{position:"absolute", top:"20px", left:"20px", width:"10px", height:"10px"}} onClick={()=>{setClose(true)}}></img>
        </div>
        
    )
};

export default PlasmoInline;
