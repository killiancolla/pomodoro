import React, { useState, useEffect } from 'react';
import '../styles/MusicPlayer.css'
import Draggable from 'react-draggable';
// import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { SettingsRounded } from '@mui/icons-material';

const MusicPlayer = (props) => {

    const musics = {
        "France":
        {
            "title": "Titre de la musique française",
            "artist": "cjsdkj",
            "duration": 105
        },
        "Japan": {
            "title": "Titre de la musique japonaise",
            "artist": "Imase",
            "duration": 153
        }
    }
    const theme = useTheme();
    const duration = musics[props.themes.code].duration;
    const [position, setPosition] = React.useState(0);
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
    let audioFile = `${props.themes.music}`;
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [pausedTime, setPausedTime] = useState(0);

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

    useEffect(() => {
        if (source) {
            source.stop();
        }
        if (audioContext && audioFile) {
            fetch(audioFile)
                .then((response) => response.arrayBuffer())
                .then((data) => audioContext.decodeAudioData(data))
                .then((decodedData) => setAudioBuffer(decodedData));
        }
    }, [audioContext, audioFile]);

    useEffect(() => {
        if (isPlaying) {
            const intervalId = setInterval(updatePosition, 100);
            return () => clearInterval(intervalId);
        }
    }, [isPlaying, audioContext, source]);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const updatePosition = () => {
        if (!isPlaying || !source || !audioContext) return;
        if (audioContext && source) {
            const currentTime = pausedTime + audioContext.currentTime - startTime;
            setPosition(Math.floor(currentTime));
        }
    };

    const handleSliderCommitted = (event, newValue) => {
        if (source) {
            setPosition(newValue);
            source.stop();
            setSource(null)
            playFromPosition(newValue);
        }
    };

    const playFromPosition = (position) => {
        if (audioContext && audioBuffer) {
            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(audioContext.destination);
            sourceNode.start(0, position);
            setSource(sourceNode);
            setIsPlaying(true);
            setStartTime(audioContext.currentTime - position);
            sourceNode.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    const play = () => {
        if (audioContext && audioBuffer && !isPlaying) {
            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(audioContext.destination);
            sourceNode.start(0, position);
            setSource(sourceNode);
            setIsPlaying(true);
            setStartTime(audioContext.currentTime);

            sourceNode.onended = () => {
                setIsPlaying(false);
            };
        }
    };


    const stop = () => {
        if (source) {
            source.stop();
            setIsPlaying(false);
            setPausedTime(audioContext.currentTime);
        }
    };

    return (
        <Draggable
            defaultClassName={`fullWindow ${props.show == 1 ? 'visible' : 'hidden'}`}
            handle='.header'
        >
            <Box sx={{
                width: 'fit-content',
                overflow: 'hidden',
            }}>
                <div className={`widget`}>
                    <div className='header'>
                        <div className='red'></div>
                        <div onClick={() => props.onViewChange({ "_id": 3, "name": "Music Player" })} className='yellow'></div>
                        <div className='green'></div>
                        <h2>Music Player</h2>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div className='cover-image'>
                            <img
                                alt="Logo "
                                src={`${props.themes.image}`}
                            />
                        </div>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography noWrap>
                                <b>{musics[props.themes.code].title}</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                {musics[props.themes.code].artist}
                            </Typography>
                        </Box>
                    </Box>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        // onChange={handleSliderChange}
                        onChangeCommitted={handleSliderCommitted}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            height: 4,
                            '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                '&:before': {
                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                        ? 'rgb(255 255 255 / 16%)'
                                        : 'rgb(0 0 0 / 16%)'
                                        }`,
                                },
                                '&.Mui-active': {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.28,
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: -2,
                        }}
                    >
                        <Typography style={{ fontSize: '0.75rem', opacity: 0.38, fontWeight: 500, letterSpacing: '0.2px' }}>
                            {formatDuration(position)}
                        </Typography>
                        <Typography style={{ fontSize: '0.75rem', opacity: 0.38, fontWeight: 500, letterSpacing: '0.2px' }}>
                            -{formatDuration(duration - position)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: -1,
                        }}
                    >
                        <IconButton className='icon-button' disabled aria-label="previous song">
                            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                        </IconButton>
                        <IconButton
                            className='icon-button'
                            aria-label={isPlaying ? 'play' : 'pause'}
                            onClick={!isPlaying ? play : stop}
                        >
                            {!isPlaying ? (
                                <PlayArrowRounded
                                    sx={{ fontSize: '3rem' }}
                                    htmlColor={mainIconColor}
                                />
                            ) : (
                                <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                            )}
                        </IconButton>
                        <IconButton className='icon-button' disabled aria-label="next song">
                            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                        </IconButton>
                    </Box>
                    <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                        <VolumeDownRounded htmlColor={lightIconColor} />
                        <Slider
                            aria-label="Volume"
                            defaultValue={30}
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                '& .MuiSlider-track': {
                                    border: 'none',
                                },
                                '& .MuiSlider-thumb': {
                                    width: 24,
                                    height: 24,
                                    backgroundColor: '#fff',
                                    '&:before': {
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                    },
                                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                        boxShadow: 'none',
                                    },
                                },
                            }}
                        />
                        <VolumeUpRounded htmlColor={lightIconColor} />
                    </Stack>
                </div>
            </Box>
        </Draggable>
    )
};

export default MusicPlayer;
