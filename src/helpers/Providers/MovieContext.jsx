import { createContext, useContext, useState } from "react";

const MovieContext = createContext(null);

export function MovieProvider({ children }) {
    const [selectedMovie, setSelectedMovie] = useState({})

    return (
        <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovie = () => useContext(MovieContext) 
