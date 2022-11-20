import logo from "data-base64:~assets/logo.png"
import cssText from "data-text:~/contents/styling.css"
import type { PlasmoContentScript } from "plasmo"
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
        </div>
    )
  }
   
export default PlasmoInline