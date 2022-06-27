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

    const [isClicked, setIsClicked] = useState(initialState);

    const handleClick = (clicked) => {
        setIsClicked({ ...isClicked, [clicked]: true});
    }

    return (
        <StateContext.Provider
            value={{  isClicked, handleClick }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

