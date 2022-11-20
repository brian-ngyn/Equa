import logo from "data-base64:~assets/logo.png"
import cssText from "data-text:~/contents/styling.css"
import type { User } from "firebase/auth"
import { Storage } from "@plasmohq/storage";
import { getDoc, setDoc, doc, DocumentData } from "firebase/firestore";
import type { PlasmoContentScript } from "plasmo"
import Axios from "axios";
import { firebaseAuth, db } from "../firebase"
import { useEffect, useState } from "react"
import checkoutUrls from "./stores.js"
import CharityCard from './CharityCard'
export const config: PlasmoContentScript = {
    matches: ["https://*/*"],
    css: ["font.css"]
}

const storage = new Storage();
export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

const renderCard = (name, image) => {
    return (
        <div>
            hello
        </div>
    )
}

const PlasmoInline = () => {
    const charityOptions = ["Alberta Animal Rescue Crew Society", "JUMP Math", "Inn from the Cold", "Horizon Housing Society"];
    const [charity, setCharity] = useState(charityOptions[0]);
    const [donationAmount, setdonationAmount] = useState(null);
<<<<<<< HEAD
    const [paymentLink, setPaymentLink] = useState(null);
    const [display, setDisplay] = useState(false);
=======
>>>>>>> 33c9135fd6aa33236d23111d3a57955e1b959f00
    const [docSnap, setdocSnap] = useState<DocumentData>(undefined);
    const [user, setUser] = useState(null);



    const getUserDB = async (equa_uid) => {
        if (equa_uid) {
            try {
                const ref = doc(db, "user", equa_uid.uid);
                var response = await getDoc(ref);
                setdocSnap(response.data());
            } catch (error) {
                console.error("Doc", error);
                alert("Please finis your signup on our website");
            }
        }
    }

    // JUST IN HERE TO SHOW VALUES OF DOC SNAP
    useEffect(() => {
        console.log("Doc Snap", docSnap);
    }, [docSnap]);

    useEffect(() => {
        console.log("USER", user);
    }, [user]);


    useEffect(() => {
        // fetch UID from the local storage
        storage.get("equa_uid").then(
            (equa_uid) => {
                getUserDB(equa_uid);
                setUser(equa_uid);
            },
            // if there are no tasks, set an empty array
            // this usually gets triggered if the method fails or returns an error
            (() => console.log("Get UID Error"))
        );

        // Determine if it is checkout;
        checkoutUrls.some(element => {
            if (window.location.href.toLowerCase().includes(element.toLowerCase())) {
              setDisplay(true);
            }})


    },
        [] // run once on moun[]
    );

    const sendReq = () => {
        const params = {
            donationAmount: donationAmount,
            charity: charity,
            email: user.email,
            docSnap: docSnap
        };
        Axios.get("http://localhost:3001/donate", {
            params
        }).then((res) => {
            if (res.data.status == "succeeded"){
                console.log("payment worked");
                // update the database and increase field "total_donated"
            } else {
                // need to do some handling for that
                console.log("payment failed");
            }
        })
    }

    return (
        display && user && docSnap &&
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
                    <p style={{
                        marginTop: "0"
                    }}>
                        Your monthly donations
                    </p>
                    
                    <p style={{
                        marginTop: "0"
                    }}>
                        ${docSnap.total_donated}/${docSnap.monthly_donation_goal}
                    </p>
                </div>
            </div>
            <p style={{ paddingLeft: "10px" }}>
                You’re ${docSnap.monthly_donation_goal - docSnap.total_donated} away from your monthly goal - would you like to make a donation to one of the charities below?
            </p>
            {renderCard("asdf", "asdf")}
            <label>Donation:</label>
            <input
                type="text"
                onChange={(event) => {
                    setdonationAmount(event.target.value);
                }}
            />
            <br />
            <label>Charity:</label>
            <form>
                <select
                    value={charity}
                    onChange={e => setCharity(e.target.value)}>
                    {charityOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </form>
            <button onClick={sendReq}>Donate!</button>
        </div>
    )
}

export default PlasmoInline