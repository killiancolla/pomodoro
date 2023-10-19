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

const MusicPlayer = (props) => {

    const theme = useTheme();
    const duration = 200;
    const [position, setPosition] = React.useState(32);
    const [paused, setPaused] = React.useState(false);
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    let audioFile = `/music/${props.music}.mp3`;
    console.log(audioFile);
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
    }, [audioContext, audioFile]);  // Ajoutez source aux dépendances

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
        <Draggable
            handle='.header'
        >
            <Box sx={{ width: 'fit-content', overflow: 'hidden' }}>
                <div className='widget'>
                    <div className='header'>
                        <div className='red'></div>
                        <div className='yellow'></div>
                        <div className='green'></div>
                        <h2>Music Player</h2>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div className='cover-image'>
                            <img
                                alt="Logo "
                                src={`/img/${props.music}.jpg`}
                            />
                        </div>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                Jun Pulse
                            </Typography>
                            <Typography noWrap>
                                <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
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
                        onChange={(_, value) => setPosition(value)}
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
