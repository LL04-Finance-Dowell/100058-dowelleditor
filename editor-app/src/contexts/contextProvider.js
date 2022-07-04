import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    align: false,
    textfill: false,
    image: false,
    table: false,
    signs: false,
    calendar: false,
    dropdown: false,
}

export const ContextProvider = ({ children }) => {

    const [isDropped, setIsDropped] = useState(initialState);

    const handleDrop = (dropped) => {
        setIsDropped({ ...isDropped, [dropped]: true});
    }

    return (
        <StateContext.Provider
            value={{  isDropped, handleDrop, setIsDropped }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

