import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { useUser } from '../utils/UserContext.jsx';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import MyChart from '../utils/MyChart.jsx';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Login = (props) => {

    const { t, i18n } = useTranslation();
    const { user, updateUser, logoutUser } = useUser();

    const [view, setView] = useState(0);

    const [days, setDays] = useState([]);
    const [time, setTime] = useState([]);

    const [register, setRegister] = useState(0);

    const [connexionForm, setConnexionForm] = useState({
        username: "",
        password: ""
    });

    const [inscriptionForm, setInscriptionForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const getPast30DaysDates = () => {
        const lastdays = [];
        const lasttime = [];
        const today = new Date();

        for (let i = 29; i >= 0; i--) {
            const pastDate = new Date(today);
            pastDate.setDate(pastDate.getDate() - i);

            const formattedDate = pastDate.toISOString().split('T')[0];
            const correspondingData = user.studyStats.find(d => d.date.split('T')[0] === formattedDate) ?? 0;

            if (correspondingData) {
                lasttime.push(correspondingData.timeStudied / (60 * 60));
            } else {
                lasttime.push(0);
            }
            lastdays.push(formattedDate);
        }

        return { lastdays, lasttime };
    };

    useEffect(() => {
        if (user) {
            const { lastdays, lasttime } = getPast30DaysDates();
            setDays(lastdays);
            setTime(lasttime);
        }
    }, [user])

    const data = {
        labels: days,
        datasets: [{
            label: 'Heures Travaillées',
            data: time,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 3,
        }]
    };

    const options = {
        scales: {
            y: {
                min: 0,
                ticks: {
                    color: "white"
                }
            },
            x: {
                ticks: {
                    color: "white"
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            let formData = {
                username: connexionForm.username,
                password: connexionForm.password
            };
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            setConnexionForm({
                username: "",
                password: ""
            });
            localStorage.setItem("user", response.data.id);
            updateUser(response.data);
            setView(0);
            props.footerDelete({ "_id": 0, "name": "Timer" });
            toast.success(t('successLogin'))
        } catch (error) {
            console.log(error);
            toast.error(t('errorLogin'));
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = {
                nom: inscriptionForm.nom,
                prenom: inscriptionForm.prenom,
                email: inscriptionForm.email,
                mdp: inscriptionForm.password
            };
            if (inscriptionForm.password == inscriptionForm.repeatPassword) {
                const response = await axios.post('http://localhost:5000/api/users/register', formData);
                setInscriptionForm({
                    nom: "",
                    prenom: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                });
            } else {
                setInscriptionForm({
                    password: "",
                    repeatPassword: ""
                });
            }
        } catch (error) {
            console.log(error);
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
                {(localStorage.getItem("user") && user !== null) ?
                    <div className='container glass-1'>
                        <div className='header'>
                            <div className='red'></div>
                            <div onClick={() => { setView(0); props.footerDelete({ "_id": 0, "name": "Timer" }); }} className='yellow'></div>
                            <div className='green'></div>
                            <h2>Mon compte</h2>
                        </div>
                        <div>
                            <MyChart data={data} options={options} />
                            <p onClick={(e) => { localStorage.removeItem("user"); logoutUser(); setView(0); props.footerDelete({ "_id": 0, "name": "Timer" }); }}>Deconnexion</p>
                        </div>
                    </div>
                    :
                    <div className='container glass-1'>
                        <div className='header'>
                            <div className='red'></div>
                            <div onClick={() => { setView(0); props.footerDelete({ "_id": 0, "name": "Timer" }); }} className='yellow'></div>
                            <div className='green'></div>
                            <h2>Connexion</h2>
                        </div>
                        {register === 0 ?
                            <form onSubmit={handleLoginSubmit}>
                                <input
                                    type='text'
                                    placeholder="Nom d'utilisateur"
                                    className='glass-1'
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
                                    className='glass-1'
                                    value={connexionForm.password}
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
                                    className='glass-1'
                                    value='Connexion'
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
                                    value={inscriptionForm.email}
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
                                    value={inscriptionForm.password}
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
                                    value={inscriptionForm.repeatPassword}
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
                }
            </div >
        </>
    )
};

export default Login;
