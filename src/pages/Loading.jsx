import React from "react";
import '../styles/Loading.css';

const Loading = (props) => {
    return (
        <div className="loading-container" style={{ opacity: props.opacity == true ? 1 : 0 }}>
            <div className="loader"></div>
            <p>Never the least.</p>
        </div>
    );
}

export default Loading;
