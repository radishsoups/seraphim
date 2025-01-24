import React, { createContext, useState } from 'react';

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
    const [font, setFont] = useState('');

    // Function to update the font size
    const updateFont = (newFont) => {
        switch (newFont) {
            case 10:
                setFont('xs')
                break;
            case 12:
                setFont('sm')
                break;
            case 14:
                setFont('large')
                break;
            case 18:
                setFont('xl')
                break;
            default:
                setFont('base')
        }
    };

    return (
        <FontContext.Provider value={{ font, updateFont }}>
            {children}
        </FontContext.Provider>
    );
};
