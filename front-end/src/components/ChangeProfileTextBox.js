// C20
import React from 'react';
import './ChangeProfileTextBox.css';

const ChangeProfileTextBox = ({ title = "About Me", description = "Hello! I'm a software developer who loves coding and building awesome projects." }) => {
    return (
        <div className="change-profile-text-box">
            <label className="profile-title">{title}</label>
            <p className="profile-description">{description}</p>
        </div>
    );
};

export default ChangeProfileTextBox;

/*
import React from 'react';
import './ChangeProfileTextBox.css';

const ChangeProfileTextBox = ({ title = "About Me", description }) => {
    return (
        <div className="change-profile-text-box">
            <label className="profile-title">{title}</label>
            <p className="profile-description">{description}</p>
        </div>
    );
};

export default ChangeProfileTextBox;
*/
