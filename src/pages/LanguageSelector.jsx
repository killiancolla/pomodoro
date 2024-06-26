import React, { useState } from 'react';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ changeLanguage }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="language-selector">
            <button onClick={toggleDropdown} className="language-button">
                <i className="ri-earth-fill"></i>
            </button>
            {
                showDropdown && (
                    <div className="language-dropdown">
                        <img
                            src="https://www.worldometers.info/img/flags/uk-flag.gif"
                            alt="English"
                            onClick={() => changeLanguage('en')}
                            style={{ cursor: 'pointer' }}
                        />
                        <img
                            src="https://www.worldometers.info/img/flags/fr-flag.gif"
                            alt="French"
                            onClick={() => changeLanguage('fr')}
                            style={{ cursor: 'pointer' }}
                        />
                        <img
                            src="https://www.worldometers.info/img/flags/it-flag.gif"
                            alt="Italian"
                            onClick={() => changeLanguage('it')}
                            style={{ cursor: 'pointer' }}
                        />
                        <img
                            src="https://www.worldometers.info/img/flags/ja-flag.gif"
                            alt="Japanese"
                            onClick={() => changeLanguage('ja')}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )
            }
        </div >
    );
};

export default LanguageSelector;
