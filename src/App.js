import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import MusicPlayer from './pages/MusicPlayer';
import ToDoList from './pages/Todolist';
import 'remixicon/fonts/remixicon.css'
import './styles/main.css'
import Draggable from 'react-draggable';
import Themes from './pages/Themes';
import Footer from './pages/Footer';
import { faPersonWalkingDashedLineArrowRight } from '@fortawesome/free-solid-svg-icons';

const App = () => {

  const [theme, setTheme] = useState('France')
  const [footer, setFooter] = useState([
    { "_id": 3, "name": "Music Player" }, { "_id": 1, "name": "ToDoList" }, { "_id": 2, "name": "Theme" }
  ])

  const handleCountryChange = (selectedCountry) => {
    setTheme(selectedCountry)
  };

  const handleFooterChange = (element) => {
    console.log("bonjour");
    if (footer.filter((val) => val._id == element._id).length == 0) {
      setFooter(currentFooter => [...currentFooter, element]);
    }
  };

  const handleFooterRemove = (elementToRemove) => {
    setFooter(currentFooter => currentFooter.filter(val => val._id !== elementToRemove._id));
  };


  return (
    <>
      <Home show={footer.filter((val) => val._id == 0).length == 0} onViewChange={handleFooterChange} />
      <MusicPlayer show={footer.filter((val) => val._id == 3).length == 0} onViewChange={handleFooterChange} music={theme} />
      <ToDoList show={footer.filter((val) => val._id == 1).length == 0} onViewChange={handleFooterChange} />
      <Themes show={footer.filter((val) => val._id == 2).length == 0} onViewChange={handleFooterChange} onCountryChange={handleCountryChange} />
      <Footer footer={footer} footerDelete={handleFooterRemove} />
    </>
  )
};

export default App;
