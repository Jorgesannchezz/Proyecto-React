
import React from "react";
import { useState } from "react";

interface InputBoxProps{
    placeholder: string
}

export const InputBox = ({placeholder="introduce un texto"}:InputBoxProps) =>{ //exporta el componente para poder ser llamado

    const [input, setInput]=useState("")//variable input (contenido del inputbox)
    const [name, setName]=useState("")//variable nombre(contenido del inputbox cuando se le da a refrescar)


    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setInput(event.target.value)
    }
    function refrescar(){
        setName(input);
    }//establece el nombre


return (
    <div>
        <input type="text" 
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        />
        <br />
        <button className="mybutton4" onClick={()=>refrescar()}>Refrescar</button> {/*boton refrescar */}
        <br />
        <h2>Bienvenido {name}</h2> {/*el bienvenido con la variable nombre */}
    
    </div>
)
}