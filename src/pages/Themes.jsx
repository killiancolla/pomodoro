// src/ToDoList.js
import React from 'react';
import '../styles/Themes.css';
import Draggable from 'react-draggable';
import { useEffect, useRef, useMemo } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import allThemes from '../data.jsx';
import { useUser } from '../utils/UserContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Themes = (props) => {

    const { t } = useTranslation();
    const draggableRef = useRef(null);
    const { user, updateUser } = useUser();
    const sliderRef = useRef();

    useEffect(() => {
        const themeIndex = Object.keys(props.themes).indexOf(props.theme.code);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(themeIndex);
        }
    }, [props.theme, props.themes]);

    const settings = useMemo(() => ({
        afterChange: (index) => {
            const themesArray = Object.values(allThemes);
            props.onThemeChange(themesArray[index]);
        },
        initialSlide: 0
    }), [props]);

    useEffect(() => {
        settings.initialSlide = Object.keys(props.themes).indexOf(props.theme.code)
    }, [props.themes, props.theme, settings])

    const handleFavClick = () => {
        const userId = localStorage.getItem('user');
        if (userId) {
            let data = {
                favTheme: props.theme.code
            };
            axios.patch(`http://localhost:5000/api/users/${userId}`, data)
                .then(response => {
                    updateUser({ ...user, favTheme: props.theme.code });
                })
                .catch(error => {
                    console.error("Erreur lors de la mise à jour des données utilisateur", error);
                });
        }
    }

    return (
        <Draggable
            nodeRef={draggableRef}
            defaultClassName={`fullWindow ${props.show === true ? 'visible' : 'hidden'}`}
            handle='.header'
        >
            <div id="themes" ref={draggableRef} className={`glass-1`}>
                <div className='header'>
                    <div className='red'></div>
                    <div onClick={() => props.onViewChange({ "_id": 2, "name": "theme" })} className='yellow'></div>
                    <div className='green'></div>
                    <h2>{t('theme')}</h2>
                </div>
                <div className="theme-selector">
                    <div id='carrousel'>
                        <Slider ref={sliderRef} {...settings}>
                            {Object.keys(props.themes).map((key) => (
                                <div key={key}>
                                    <h3 style={{ textAlign: "center" }}>{t(key)}</h3>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                {
                    user ?
                        <button onClick={handleFavClick}>Définir comme favori</button>
                        : ''
                }
            </div>
        </Draggable>
    );
};

export default Themes;
