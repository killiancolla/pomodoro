import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import MusicPlayer from './pages/MusicPlayer';
import ToDoList from './pages/Todolist';
import Loading from './pages/Loading';
import 'remixicon/fonts/remixicon.css'
import './styles/main.css'
import Themes from './pages/Themes';
import Footer from './pages/Footer';
import Message from './pages/Message';
import Login from './pages/Login';
import allThemes from './data';
import { useUser } from './utils/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { user, updateUser, logoutUser } = useUser();
  const [backgroundImage, setBackgroundImage] = useState('/img/coffee.jpeg');
  const [theme, setTheme] = useState(allThemes["cafe"]);
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState([
    { "_id": 0, "name": "timer" }, { "_id": 3, "name": "musicplayer" }, { "_id": 1, "name": "todolist" }, { "_id": 2, "name": "theme" }
  ])
  const [themeInit, setThemeInit] = useState(false);

  const appStyle = {
    margin: 0,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    if (user && user.favTheme && allThemes[user.favTheme] && !themeInit) {
      setTheme(allThemes[user.favTheme]);
      setBackgroundImage(allThemes[user.favTheme].image)
      setThemeInit(true)
    }
    // else if (!themeInit) {
    //   setTheme(allThemes["Default"])
    //   setThemeInit(true)
    // }
  }, [user])

  const handleThemeChange = (selectedCountry) => {
    setBackgroundImage(selectedCountry.image)
    setTheme(selectedCountry)
  };

  const handleFooterChange = (element) => {
    if (footer.filter((val) => val._id === element._id).length === 0) {
      setFooter(currentFooter => [...currentFooter, element]);
    }
  };

  const handleFooterRemove = (elementToRemove) => {
    setFooter(currentFooter => currentFooter.filter(val => val._id !== elementToRemove._id));
  };

  const handleFooterClear = () => {
    setFooter([
      { "_id": 3, "name": "musicplayer" }, { "_id": 1, "name": "todolist" }, { "_id": 2, "name": "theme" }, { "_id": 0, "name": "timer" }
    ]);
  };

  return (
    <div style={appStyle}>
      <Loading opacity={loading} />
      <ToastContainer />
      <Message footerDelete={handleFooterRemove} />
      <Home
        show={footer.filter((val) => val._id === 0).length === 0}
        onViewChange={handleFooterChange}
        themes={theme}
      />
      <MusicPlayer
        show={footer.filter((val) => val._id === 3).length === 0}
        onViewChange={handleFooterChange}
        themes={theme}
      />
      <ToDoList
        show={footer.filter((val) => val._id === 1).length === 0}
        onViewChange={handleFooterChange}
      />
      <Themes
        themes={allThemes}
        theme={theme}
        show={footer.filter((val) => val._id === 2).length === 0}
        onViewChange={handleFooterChange}
        onThemeChange={handleThemeChange}
      />
      {/* <Login
        footerClear={handleFooterClear}
        footerDelete={handleFooterRemove}
      /> */}
      <Footer
        footer={footer}
        footerDelete={handleFooterRemove}
      />
    </div>
  )
};

export default App;
