import React, { useState } from "react"


function RenderCard(name, image){

  const [selected, setSelected] = React.useState(false);

  return (
    <div className="border-2 rounded h-full flex justify-center">
      <div>
        <div>
          <img src={image} alt={`${name} description`} />
        </div> 
        <div>
          <p className="font-body mb-2">{name}</p>
        </div>
      </div>
    </div>
    // <h1>
    //   hello
    // </h1>
  )
}

export default RenderCard