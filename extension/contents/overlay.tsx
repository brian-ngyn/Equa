import logo from "data-base64:~assets/logo.png"
import cssText from "data-text:~/contents/styling.css"
import type { PlasmoContentScript } from "plasmo"
import Axios from "axios";
import { useEffect, useState } from "react"
import CharityCard from './CharityCard'
export const config: PlasmoContentScript = {
    matches: ["https://www.plasmo.com/*"],
    css: ["font.css"]
  }

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
    const charityOptions = ["Alberta Animal Rescue Crew Society", "JUMP Math"];
    const [charity, setCharity] = useState(charityOptions[0]);
    const [donationAmount, setdonationAmount] = useState(null);
    const [paymentLink, setPaymentLink] = useState(null);

    const sendReq = () => {
        const params = {
            donationAmount: donationAmount,
            charity: charity
          };
        Axios.get("http://localhost:3001/create-checkout-session", {
            params
        }).then((response) => {
            setPaymentLink(response.data);
            console.log(response.data.url);
            window.open(response.data.url, '_blank', 'noopener,noreferrer');
        });
    }
    return (
        <div className="container">
            <div style={{
                display:"flex",
                width:"100%",
            }}>
                <img src={logo}></img>
                <div style={{
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <h1 style={{
                        marginBottom:"0",
                        color:"#1C6758"
                    }}>
                        Hi, NAME!
                    </h1>
                    <p style={{
                        marginTop:"0"
                    }}>
                        Your monthly donations
                    </p>
                    <div style={{
                        width:"100%",
                        height:"25px",
                        backgroundColor:"red",
                        marginBottom:"10px",
                        borderRadius:"50px",
                    }}>
                    </div>
                    <p style={{
                        marginTop:"0"
                    }}>
                        $14.00/$25.00
                    </p>
                </div>
            </div>
            <p style={{paddingLeft:"10px"}}>
                You’re $11.00 away from your monthly goal - would you like to make a donation to one of the charities below?
            </p>
            {renderCard("asdf","asdf")}
            <label>Donation:</label>
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
            <button onClick={sendReq}>Donate!</button>
        </div>
    )
  }
   
export default PlasmoInline