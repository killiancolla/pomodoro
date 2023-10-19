import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import MusicPlayer from './pages/MusicPlayer';
import ToDoList from './pages/Todolist';
import 'remixicon/fonts/remixicon.css'
import Draggable from 'react-draggable';
import Themes from './pages/Themes';

const App = () => {

  const [theme, setTheme] = useState('France')

  const handleCountryChange = (selectedCountry) => {
    setTheme(selectedCountry)
  };

  return (
    <>
      <Home />
      <MusicPlayer music={theme} />
      <ToDoList />
      <Themes onCountryChange={handleCountryChange} />
    </>
  )
};

export default App;
