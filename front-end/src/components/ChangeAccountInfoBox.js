//C19 CurrentValue change to Mona hard code for now?


import React from 'react';
import './ChangeAccountInfoBox.css';

const ChangeAccountInfoBox = ({ label = "First Name", CurrentValue = "Mona" }) => {
    return (
        <div className="change-account-info-box">
            <label className="info-label">{label}</label>
            <p className="info-value">{CurrentValue}</p> 
        </div>
    );
};

export default ChangeAccountInfoBox;

