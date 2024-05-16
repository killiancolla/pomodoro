import React, { useState } from "react";
import { useSSR } from "react-i18next";
import '../styles/Message.css';

const Message = (props) => {

    const [message, setMessage] = useState(true);

    const handleClick = () => {
        props.footerDelete({ _id: 0, name: "timer" });
        setMessage(false);
    }

    return (
        <div id="message" className={`glass-1 ${message == true ? 'visible' : 'hidden'}`}>
            <p>
                Bienvenue ! Découvrez notre méthode Pomodoro intégrée pour booster votre productivité. Ce timer vous aide à structurer vos périodes de travail par sessions de 25 minutes, alternées de courtes pauses. Profitez également de fonctionnalités flexibles pour organiser vos tâches, écouter de la musique, et personnaliser l'apparence de votre espace de travail selon vos besoins. Lancez-vous et maximisez votre efficacité dès maintenant !
            </p>
            <button onClick={handleClick}>Entrer</button>
        </div >
    )
}

export default Message;