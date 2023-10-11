import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import MusicPlayer from './pages/MusicPlayer';
import ToDoList from './pages/Todolist';

const App = () => {

  return (
    <>
      <Home />
      <MusicPlayer />
      <ToDoList />
    </>
  )
};

export default App;
