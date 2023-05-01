// src/MusicPlayer.js
import React, { useState, useEffect } from 'react';

const MusicPlayer = ({ audioFile }) => {
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!audioContext) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(context);
        }

        if (audioContext && !audioBuffer) {
            fetch(audioFile)
                .then((response) => response.arrayBuffer())
                .then((data) => audioContext.decodeAudioData(data))
                .then((decodedData) => setAudioBuffer(decodedData));
        }
    }, [audioContext, audioBuffer, audioFile]);

    const play = () => {
        if (audioContext && audioBuffer && !isPlaying) {
            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(audioContext.destination);
            sourceNode.start(0);
            setSource(sourceNode);
            setIsPlaying(true);

            sourceNode.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    const stop = () => {
        if (source) {
            source.stop();
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <button onClick={play}>Play</button>
            <button onClick={stop}>Stop</button>
        </div>
    );
};

export default MusicPlayer;
