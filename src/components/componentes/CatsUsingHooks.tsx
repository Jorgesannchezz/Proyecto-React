import React from "react";

import { useCat } from "./useCat";
import { useQuote } from "./UseQuote";

export const CatUsingHooks = () => {

    const cat = useCat();
    const quote = useQuote();

return(
    <>
    <h1>Frase aleatoria: </h1>
    <br />
    {cat}
    <h3>{quote}</h3>
    </>
)
}

export default CatUsingHooks
