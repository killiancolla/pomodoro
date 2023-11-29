import React, { useState } from 'react';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"

const Login = (props) => {

    const [view, setView] = useState(0);

    const [register, setRegister] = useState(0);

    const [connexionForm, setConnexionForm] = useState({
        username: "",
        password: ""
    })

    const [inscriptionForm, setInscriptionForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(inscriptionForm);
        if (inscriptionForm.password == inscriptionForm.repeatPassword) {
            let data = {
                nom: inscriptionForm.nom,
                prenom: inscriptionForm.prenom,
                email: inscriptionForm.email,
                mdp: inscriptionForm.password
            };
            let resultat = axios.post("http://localhost:5000/api/users/register", data);
            console.log(resultat.data);
        } else {
            console.log("mot de passe éronné");
        }
    }

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
                    {register === 0 ?
                        <form>
                            <input
                                type='text'
                                placeholder="Nom d'utilisateur"
                                value={connexionForm.username}
                                onChange={(e) => {
                                    setConnexionForm(prevState => {
                                        return {
                                            ...prevState,
                                            username: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='password'
                                placeholder='Mot de passe'
                                onChange={(e) => {
                                    setConnexionForm(prevState => {
                                        return {
                                            ...prevState,
                                            password: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='submit'
                            />
                            <p onClick={(e) => setRegister(1)}>Inscription</p>
                        </form>
                        :
                        <form onSubmit={handleRegisterSubmit}>
                            <input
                                type='text'
                                placeholder="Nom"
                                value={inscriptionForm.nom}
                                onChange={(e) => {
                                    setInscriptionForm(prevState => {
                                        return {
                                            ...prevState,
                                            nom: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='text'
                                placeholder='Prénom'
                                value={inscriptionForm.prenom}
                                onChange={(e) => {
                                    setInscriptionForm(prevState => {
                                        return {
                                            ...prevState,
                                            prenom: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='text'
                                placeholder='Email'
                                onChange={(e) => {
                                    setInscriptionForm(prevState => {
                                        return {
                                            ...prevState,
                                            email: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='password'
                                placeholder='Mot de passe'
                                onChange={(e) => {
                                    setInscriptionForm(prevState => {
                                        return {
                                            ...prevState,
                                            password: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='password'
                                placeholder='Repeter votre mot de passe'
                                onChange={(e) => {
                                    setInscriptionForm(prevState => {
                                        return {
                                            ...prevState,
                                            repeatPassword: e.target.value
                                        };
                                    });

                                }}
                            />
                            <input
                                type='submit'
                            />
                            <p onClick={(e) => setRegister(0)}>Connexion</p>
                        </form>
                    }
                </div>
            </div >
        </>
    )
};

export default Login;
