// src/ToDoList.js
import { exists, t } from 'i18next';
import '../styles/Themes.css';
import Draggable from 'react-draggable';
import { useState } from 'react';
import React from 'react';

const Themes = (props) => {

    const [state, setState] = useState('France')

    const handleChange = (event) => {
        const selectedCountry = event.target.value;
        setState(selectedCountry);
        props.onCountryChange(selectedCountry);
    };

    return (
        <Draggable>
            <div id='themes' className='glass-2'>
                <div className='header'>
                    <div className='red'></div>
                    <div className='yellow'></div>
                    <div className='green'></div>
                    <h2>Theme</h2>
                </div>
                {state}
                <div className="theme-selector">
                    <select value={state} onChange={handleChange}>
                        <option value="France">France</option>
                        <option value="Japan">Japon</option>
                    </select>
                </div>
            </div>
        </Draggable>
    );
};

export default Themes;
