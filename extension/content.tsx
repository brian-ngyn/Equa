import Axios from "axios";
import { useEffect, useState } from "react"

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
        <div style={{
            backgroundColor:"#FDF8EF",
            width:"500px",
            height:"300px",
            position:"fixed",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding:"20px",
            right:"20px",
            top:"20px"
        }}>
            <h1>
                Equa
            </h1>
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