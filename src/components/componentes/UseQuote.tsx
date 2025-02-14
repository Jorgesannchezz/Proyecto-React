import { useEffect, useState, useRef } from "react";
import React from "react";

export function useQuote() {
    const [quote, setQuote] = useState('');
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return; // Evitar doble solicitud.
        hasFetched.current = true; // Marcar como completado.

        fetch(`https://dummyjson.com/quotes/random`).then(data =>
            data.json()
        ).then((data) => {
            setQuote(data.quote);
        })
    }, []);

    const quoteStyle: React.CSSProperties = {
        display: 'inline-block',
        width: '500px',
        height: '100px',
        fontSize: '20px',
        textAlign: 'center' as 'center',
        verticalAlign: 'middle',
        lineHeight: '100px' // hacer que el texto esté centrado verticalmente
    };

    return <div style={quoteStyle}>{quote}</div>;
}