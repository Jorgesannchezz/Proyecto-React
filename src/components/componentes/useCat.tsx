import { useEffect, useState, useRef } from "react";
import React from "react";


export function useCat(){
    const [url, setUrl] = useState<string>();
    const hasFetched = useRef(false); //Se utiliza para que no se duplique la peticion al reutilizar el componente

    useEffect(()=>{
        if (hasFetched.current) return; // Evitar doble solicitud.
        hasFetched.current = true; // Marcar como completado.
        
        fetch( "https://api.thecatapi.com/v1/images/search ")
        .then((response) => response.json())
        .then((data) => {
            // El dato devuelto es un array con un objeto. Accedemos al primer elemento y su propiedad `url'.
            const imageUrl = data[0]?.url;
            console.log(imageUrl);
            setUrl(imageUrl);
        })
        .catch((error) => {
            console.error("Error fetching the cat image:", error);
        });
    },[])

    const imageStyle: React.CSSProperties = {
        width: '300px',
        height: '300px',
        objectFit: 'cover' as 'cover' // ajustar el tipo de la propiedad
    };

    return <img src={url} style={imageStyle} />;
}