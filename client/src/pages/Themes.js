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
import allThemes from '../data';

const Themes = (props) => {

    const settings = {
        afterChange: (index) => {
            const themesArray = Object.values(allThemes);
            props.onThemeChange(themesArray[index]);
        }
    };

    return (
        <Draggable
            defaultClassName={`fullWindow ${props.show == 1 ? 'visible' : 'hidden'}`}
            handle='.header'
        >
            <div id="themes" className={`glass-1`}>
                <div className='header'>
                    <div className='red'></div>
                    <div onClick={() => props.onViewChange({ "_id": 2, "name": "Theme" })} className='yellow'></div>
                    <div className='green'></div>
                    <h2>Theme</h2>
                </div>
                <div className="theme-selector">
                    <div id='carrousel'>
                        <Slider {...settings}>
                            {Object.keys(props.themes).map((key) => (
                                <div key={key}>
                                    <h3 style={{ textAlign: "center" }}>{key}</h3>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Themes;
