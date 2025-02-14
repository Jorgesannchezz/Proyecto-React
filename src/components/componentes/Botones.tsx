import React from "react"
import "./Botones.css"
import { useState } from "react"
//import { useCounter } from ""

export const Botones = () => {

const [count, setCount] = useState(1)

function contador(value:number){
        setCount(count+value)
        return count   
    }

  return (
    <>
    <h3>Contador:{count}</h3>
      <div>
      <button className="mybutton2" onClick={()=>contador(1)}>+1</button>
      <button className="mybutton3" onClick={()=>contador(-1)}>-1</button>
      </div>
    </>
  )
}

export default Botones