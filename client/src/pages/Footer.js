import React from 'react';
import '../styles/Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = (props) => {

    const { t } = useTranslation();

    return (
        <div id='footer'>
            {props.footer.map((item, index) => (
                <div key={index} onClick={() => props.footerDelete(item)} className='glass-1 window'>
                    <h1>{t(item.name)}</h1>
                </div>
            ))}
        </div>
    );
};

export default Footer;
