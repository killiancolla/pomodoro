import React, { useState, useEffect } from 'react';
import '../styles/MusicPlayer.css'

const MusicPlayer = () => {

    let audioFile = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";
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
        <div id='musicPlayer' className='glass-2'>
            <div className='header'>
                <div className='red'></div>
                <div className='yellow'></div>
                <div className='green'></div>
                <h2>Music Player</h2>
            </div>
            <button className='glass-3' onClick={play}>Play</button>
            <button className='glass-3' onClick={stop}>Stop</button>
        </div>
    );
};

export default MusicPlayer;
