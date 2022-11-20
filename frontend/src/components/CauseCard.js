import React, { useState } from "react";

function RenderCard(name, image) {
  const [selected, setSelected] = React.useState(false);

  function changeSelected() {
    selected ? setSelected(false) : setSelected(true);
  }
  return (
    <button onClick={changeSelected}>
      <div
        className={`${
          selected ? "border-4" : "border hover:border-b-4 hover:border-r-2"
        } rounded-xl h-64 w-52 mx-4 my-4 flex justify-center`}
      >
        <div className="relative pb-5 px-5">
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
            {name}
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
