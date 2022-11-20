import React, { useState } from "react";
import { useUserAuth } from "../components/authentication/context/UserAuthContext";

function RenderCard(name, alt_name, image) {
  const [selected, setSelected] = React.useState(false);
  const { causesStatus } = useUserAuth();

  function changeSelected() {
    if (selected){
      setSelected(false);
      causesStatus[name] = false;
    }
    else {
      setSelected(true);
      causesStatus[name] = true;
    }
  }

  return (
    <button onClick={changeSelected}>
      <div
        className={`${
          selected ? "border-4" : "border hover:border-b-4 hover:border-r-2"
        } rounded-xl h-64 w-52 mx-4 my-4 flex justify-center`}
      >
        <div className="relative pb-5 px-5" style={{"paddingTop":"15px"}}>
          {selected && <img className="h-5 w-5 absolute top-2 right-2" src="../../assets/images/Checkmark.svg" alt="checkmark"/>} 
          <div className="p-1">
            <img
              className="h-44 w-44"
              src={image}
              alt={`${name} description`}
            />
          </div>
          {/* <div className="mt-auto"> */}
          <p className="mt-auto mb-4 font-body text-xl font-semibold inset-x-0 bottom-0">
            {alt_name}
          </p>
          {/* </div> */}
        </div>
      </div>
    </button>

    // <h1>
    //   hello
    // </h1>
  );
}

export default RenderCard;
