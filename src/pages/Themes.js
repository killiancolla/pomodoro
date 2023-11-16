// src/ToDoList.js
import { exists, t, use } from 'i18next';
import '../styles/Themes.css';
import Draggable from 'react-draggable';
import { useState } from 'react';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const Themes = (props) => {

    const [state, setState] = useState('France')

    const [view, setView] = useState(1)

    const handleChange = (event) => {
        const selectedCountry = event.target.value;
        setState(selectedCountry);
        props.onCountryChange(selectedCountry);
    };

    const settings = {
        afterChange: (index) => {
            let selectedCountry = ''
            switch (index) {
                case 0:
                    selectedCountry = 'France'
                    break;
                case 1:
                    selectedCountry = 'Japan'
                    break;
                default:
                    selectedCountry = 'Autre';
            }
            setState(selectedCountry)
            props.onCountryChange(selectedCountry);
        }
    };

    return (
        <Draggable
            defaultClassName={`fullWindow ${props.show == 1 ? 'visible' : 'hidden'}`}
            handle='.header'
        >
            <div id="themes" className={`glass-2`}>
                <div className='header'>
                    <div className='red'></div>
                    <div onClick={() => props.onViewChange({ "_id": 2, "name": "Theme" })} className='yellow'></div>
                    <div className='green'></div>
                    <h2>Theme</h2>
                </div>
                <div className="theme-selector">
                    <div id='carrousel'>
                        <Slider {...settings}>
                            <div>
                                <h3>France</h3>
                            </div>
                            <div>
                                <h3>Japan</h3>
                            </div>
                        </Slider>
                    </div>
                    {/* <select value={state} onChange={handleChange}>
                        <option value="France">France</option>
                        <option value="Japan">Japon</option>
                    </select> */}
                </div>
            </div>
        </Draggable>
    );
};

export default Themes;
