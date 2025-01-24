import React, { createContext, useState } from 'react';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('Light');

    // Function to update the color
    const updateColor = (newColor) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, updateColor }}>
            {children}
        </ColorContext.Provider>
    );
};
