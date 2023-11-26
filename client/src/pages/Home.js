import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import LanguageSelector from '../pages/LanguageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';

const sessionDuration = 25 * 60;
const breakDuration = 5 * 60;

var nbCycle = 1;
const Timer = ({ minutes, seconds }) => {
    return (
        <div className='timer'>
            <span>{minutes.toString().padStart(2, '0')}</span>:
            <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
};

const Home = (props) => {

    const { t, i18n } = useTranslation();
    const [cycles, setCycles] = useState(nbCycle);
    const [timeLeft, setTimeLeft] = useState(sessionDuration);
    const [breakTime, setBreakTime] = useState(breakDuration);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                setTotalWorkTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft === 0) {
            if (cycles > 1 && !isBreak) {
                setIsBreak(true);
                setTimeLeft(breakTime);
            } else if (cycles >= 1 && isBreak) {
                setIsBreak(false);
                setTimeLeft(sessionDuration);
                setCycles(cycles - 1);
            } else {
                setIsRunning(false);
            }
        }
    }, [timeLeft, cycles, breakTime, isBreak]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleCyclesChange = (event) => {
        nbCycle = parseInt(event.target.value);
        setCycles(nbCycle);
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setTotalWorkTime(0);
        setIsRunning(false);
        setIsBreak(false);
        setTimeLeft(sessionDuration);
        setCycles(cycles);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Draggable
            defaultClassName={`fullWindow ${props.show == 1 ? 'visible' : 'hidden'}`}
            positionOffset={{ x: '-50%', y: '-50%' }}
            handle='.header' >
            <div className={`glass-1 App`}>
                <div className='header'>
                    <div className='red'></div>
                    <div onClick={() => props.onViewChange({ "_id": 0, "name": "Timer" })} className='yellow'></div>
                    <div className='green'></div>
                    <h2>Timer</h2>
                </div>
                <div className='inline'>
                    <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </div>
                    <LanguageSelector changeLanguage={changeLanguage} />
                </div>
                <h1>{t('welcome')}</h1>
                <label htmlFor="cycles">{t('numberCycle')}</label>
                <input
                    type="number"
                    id="cycles"
                    min="1"
                    className='glass-1'
                    value={cycles}
                    onChange={handleCyclesChange}
                    disabled={isRunning}
                />
                <br />
                <h3>{t('session')} {(nbCycle - cycles + 1) + '/' + nbCycle}</h3>
                <h2>
                    <Timer
                        minutes={Math.floor(timeLeft / 60)}
                        seconds={timeLeft % 60}
                    />
                </h2>
                <p>
                    {t('workSince')}
                    <Timer
                        minutes={Math.floor(totalWorkTime / 60)}
                        seconds={totalWorkTime % 60}
                    />
                </p>
                <br />
                <button className='glass-1' onClick={handleStart} disabled={isRunning}>
                    {t('start')}
                </button>
                <button className='glass-1' onClick={handleStop} disabled={!isRunning}>
                    {t('stop')}
                </button>
                <button className='glass-1' onClick={handleReset}>{t('reset')}</button>
            </div>
        </Draggable >
    )
};

export default Home;
