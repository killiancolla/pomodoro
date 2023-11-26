import React, { useState } from 'react';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {

    const [view, setView] = useState(0);

    return (
        <>
            <div id='login' className='glass-1' style={{
                display: view === 1 ? 'none' : ''
            }}>
                <FontAwesomeIcon fontSize={"2em"} icon={faPerson} onClick={() => { setView(1); props.footerClear(); }} />
            </div>
            <div id='formConnexion' style={{
                display: view === 0 ? 'none' : ''
            }}>
                <div className='container glass-1'>
                    <div className='header'>
                        <div className='red'></div>
                        <div onClick={() => { setView(0); props.footerDelete({ "_id": 0, "name": "Timer" }); }} className='yellow'></div>
                        <div className='green'></div>
                        <h2>Connexion</h2>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;
