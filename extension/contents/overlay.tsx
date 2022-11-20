import logo from "data-base64:~assets/logo.png";
import checkmark from "data-base64:~assets/Checkmark.svg";
import cssText from "data-text:~/contents/styling.css";
import type { PlasmoContentScript } from "plasmo";
import Axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';

export const config: PlasmoContentScript = {
  matches: ["https://www.plasmo.com/*"],
  css: ["font.css"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};


const charities = [
  {
    name: "Charity 1",
    description: "adsfasdfasdf",
    image: "asdfasdf",
  },
  {
    name: "Charity 2",
    description: "adsfasdfasdf",
    image: "asdfasdf",
  },
  {
    name: "Charity 3",
    description: "adsfasdfasdf",
    image: "asdfasdf",
  },
  {
    name: "Charity 4",
    description: "adsfasdfasdf",
    image: "asdfasdf",
  },
];

const PlasmoInline = () => {
  const charityOptions = ["Alberta Animal Rescue Crew Society", "JUMP Math"];
  const [charity, setCharity] = useState(charityOptions[0]);
  const [donationAmount, setdonationAmount] = useState("2");
  const [paymentLink, setPaymentLink] = useState(null);
  const [selected, setSelected] = useState("");

const renderPartnerLabel = () => {
    const partners = ["sportchek", "walmart", "marks"];
    const totValue = parseFloat(donationAmount)*2;
    let isPartner = false;
    if (!isPartner){
        return null
    }
    return (
        <div style={{textAlign:"center", paddingTop:"20px",paddingBottom:"10px"}}>
            <strong>
                Walmart will match this donation for a total donation of ${totValue}!
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
        }}
        onClick={() => {
          setSelected(name);
        }}
      >
        <img
            src="https://aarcs.ca/wp-content/uploads/2020/05/aarcs_sq.png"
            style={{ height: "100%" }}
            className="cover"
        ></img>
        <div style={{ position: "relative", width: "100%", display:"flex", alignItems:"center" }}>
        <p className="cover" style={{paddingLeft:"15px", fontFamily:"32px", fontWeight:"600"}}>{name}</p>
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
    const params = {
      donationAmount: donationAmount,
      charity: charity,
    };
    Axios.get("http://localhost:3001/create-checkout-session", {
      params,
    }).then((response) => {
      setPaymentLink(response.data);
      console.log(response.data.url);
      window.open(response.data.url, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          width: "100%",
          color: "#3C1518",
        }}
      >
        <img src={logo}></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              marginBottom: "0",
              color: "#1C6758",
            }}
          >
            Hi, NAME!
          </h1>
          <p
            style={{
              marginTop: "0",
            }}
          >
            Your monthly donations
          </p>
          <div
            style={{
              width: "100%",
              height: "25px",
              backgroundColor: "red",
              marginBottom: "10px",
              borderRadius: "50px",
            }}
          ></div>
          <p
            style={{
              marginTop: "0",
            }}
          >
            $14.00/$25.00
          </p>
        </div>
      </div>
      <p style={{ paddingLeft: "10px" }}>
        You’re $11.00 away from your monthly goal - would you like to make a
        donation to one of the charities below?
      </p>
      <Grid container spacing={2}>
        {charities.map((charity) =>
          renderCard(charity.name, charity.image, charity.description)
        )}
      </Grid>
      <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
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
                        height:"30px",
                        outline:"none",
                        backgroundColor:"#fdf8ef",
                        borderRadius:"5px",
                        border:"1px solid rgb(60, 21, 24)",
                        textAlign:"right",
                        paddingRight:"10px"
                    }}
                />
      </div>
      {renderPartnerLabel()}
      <div style={{"width":"100%","textAlign":"center","paddingTop":"20px", "paddingBottom":"20px"}}>
        <button style={{
            width:"40%",
            height:"50px",
            backgroundColor:"#1C6758",
            borderStyle:"hidden",
            color:"#ffffff",
            borderRadius:"20px",
            fontSize:"24px",
            cursor:"pointer",
        }}>
            Donate!
        </button>
      </div>
      {/* <label>Donation:</label>
            <input
                type="text"
                onChange={(event) => {
                setdonationAmount(event.target.value);
                }}
            />
            <br/>
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
            <button onClick={sendReq}>Donate!</button> */}
    </div>
  );
};

export default PlasmoInline;
