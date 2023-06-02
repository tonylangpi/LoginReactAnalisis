import React, { createContext } from "react";

export const authContext = createContext();

const authContextProvider = ( {children} ) => {
    return (
        <authContext.Provider>
            {children}
        </authContext.Provider>
    );
}

export default authContextProvider;