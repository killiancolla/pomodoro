import React, { useState, useEffect } from 'react';
import './App.css';
import Todolist from './Todolist';

const sessionDuration = 10;
const breakDuration = 5;
var nbCycle = 1; 
const Timer = ({ minutes, seconds }) => {
  return (
    <div>
      <span>{minutes.toString().padStart(2, '0')}</span>:
      <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

const App = () => {
  const [cycles, setCycles] = useState(nbCycle);
  const [timeLeft, setTimeLeft] = useState(sessionDuration);
  const [breakTime, setBreakTime] = useState(breakDuration);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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
      } else if(cycles >= 1 && isBreak) {
        setIsBreak(false);
        setTimeLeft(sessionDuration);
        setCycles(cycles - 1);
      } else {
        setIsRunning(false);
      }
    }
  }, [timeLeft, cycles, breakTime, isBreak]);

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
    setCycles(1);
  };

  return (
    <div className="App">
      <h1>Méthode Pomodoro</h1>
      <label htmlFor="cycles">Nombre de cycles : </label>
      <input
        type="number"
        id="cycles"
        min="1"
        value={cycles}
        onChange={handleCyclesChange}
        disabled={isRunning}
      />
      <br />
      <h2>Je travaille depuis : 
        <Timer
        minutes={Math.floor(totalWorkTime / 60)}
        seconds={totalWorkTime % 60}
        />
      </h2>
      <Timer
        minutes={Math.floor(timeLeft / 60)}
        seconds={timeLeft % 60}
      />
      <br />
      <button onClick={handleStart} disabled={isRunning}>
        Démarrer
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Arrêter
      </button>
      <button onClick={handleReset}>Réinitialiser</button>
      <Todolist/>
    </div>
  );
};

export default App;
