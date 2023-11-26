import React from 'react';
import '../styles/Footer.css';

const Footer = (props) => {

    return (
        <div id='footer'>
            {props.footer.map((item, index) => (
                <div key={index} onClick={() => props.footerDelete(item)} className='glass-1 window'>
                    <h1>{item.name}</h1>
                </div>
            ))}
        </div>
    );
};

export default Footer;
