import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/MusicPlayer.css';
import Draggable from 'react-draggable';
import { useTheme } from '@mui/material/styles';
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

    const draggableRef = useRef(null);
    const musics = props.themes;
    const theme = useTheme();
    const [position, setPosition] = useState(0);
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [pausedTime, setPausedTime] = useState(0);
    const [totalPausedTime, setTotalPausedTime] = useState(0);
    const [volume, setVolume] = useState(30);

    useEffect(() => {
        if (!audioContext) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(context);
        }
    }, [audioContext]);

    useEffect(() => {
        if (audioContext && !audioBuffer) {
            fetch(musics.musicInfo[currentTrackIndex].link)
                .then((response) => response.arrayBuffer())
                .then((data) => audioContext.decodeAudioData(data))
                .then((decodedData) => {
                    setAudioBuffer(decodedData)
                    if (isPlaying) {
                        const sourceNode = audioContext.createBufferSource();
                        const gainNode = audioContext.createGain();
                        sourceNode.buffer = decodedData;
                        sourceNode.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        gainNode.gain.value = volume / 100;
                        sourceNode.start(0, position);
                        setSource(sourceNode);
                    }
                });
        }
    }, [audioContext, audioBuffer, currentTrackIndex, musics, isPlaying, position, volume]);

    const playNextTrack = useCallback(() => {
        setAudioBuffer(null);
        setAudioContext(null);
        setPosition(0);
        setTotalPausedTime(0);
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musics.musicInfo.length)
        setIsPlaying(true)
    }, [musics.musicInfo.length]);

    const updatePosition = useCallback(() => {
        if (!isPlaying || !source || !audioContext) return;
        if (audioContext && source) {
            const currentTime = audioContext.currentTime - totalPausedTime;
            setPosition(Math.floor(currentTime));
            if (currentTime >= audioBuffer?.duration) {
                playNextTrack();
            }
        }
    }, [totalPausedTime, audioBuffer?.duration, audioContext, isPlaying, playNextTrack, source]);

    useEffect(() => {
        if (isPlaying) {
            const intervalId = setInterval(updatePosition, 100);
            return () => clearInterval(intervalId);
        }
    }, [isPlaying, audioContext, source, updatePosition]);

    const playPreviousTrack = () => {
        stop();
        if (position <= 8) {
            setCurrentTrackIndex((prevIndex) => {
                const newIndex = (prevIndex - 1) % musics.musicInfo.length;
                return newIndex < 0 ? musics.musicInfo.length - 1 : newIndex;
            });
        }
        setAudioBuffer(null);
        setAudioContext(null);
        setPosition(0);
        setTotalPausedTime(0);
        setIsPlaying(true)
    };

    const play = () => {
        if (audioContext && audioBuffer && !isPlaying) {
            const sourceNode = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = volume / 100;
            sourceNode.start(0, position);
            setSource(sourceNode);
            setIsPlaying(true);
            setTotalPausedTime(totalPausedTime + (audioContext.currentTime - pausedTime));
        }
    };

    const stop = () => {
        if (source) {
            source.stop();
            setIsPlaying(false);
            setPausedTime(audioContext.currentTime);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (source && audioContext) {
            const gainNode = audioContext.createGain();
            gainNode.gain.value = newValue / 100;
            source.disconnect();
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
        }
    };

    function formatDuration(value) {
        value = Math.round(value)
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    return (
        <Draggable nodeRef={draggableRef} defaultClassName={`fullWindow ${props.show === true ? 'visible' : 'hidden'}`} handle='.header'>
            <Box ref={draggableRef} sx={{ width: 'fit-content', overflow: 'hidden' }}>
                <div className={`widget`}>
                    <div className='header'>
                        <div className='red'></div>
                        <div onClick={() => props.onViewChange({ "_id": 3, "name": "Music Player" })} className='yellow'></div>
                        <div className='green'></div>
                        <h2>Music Player</h2>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div className='cover-image'>
                            <img alt="Logo " src={`${musics.musicInfo[currentTrackIndex].image}`} />
                        </div>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography noWrap>
                                <b>{musics.musicInfo[currentTrackIndex].title}</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                {musics.musicInfo[currentTrackIndex].artist}
                            </Typography>
                        </Box>
                    </Box>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={audioBuffer?.duration ?? 0}
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
                                    boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'}`,
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -2 }}>
                        <Typography style={{ fontSize: '0.75rem', opacity: 0.38, fontWeight: 500, letterSpacing: '0.2px' }}>
                            {formatDuration(position)}
                        </Typography>
                        {audioBuffer && (
                            <Typography style={{ fontSize: '0.75rem', opacity: 0.38, fontWeight: 500, letterSpacing: '0.2px' }}>
                                -{formatDuration(audioBuffer.duration - position)}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>
                        <IconButton onClick={playPreviousTrack} className='icon-button' aria-label="previous song">
                            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                        </IconButton>
                        <IconButton className='icon-button' aria-label={isPlaying ? 'pause' : 'play'} onClick={isPlaying ? stop : play}>
                            {isPlaying ? (
                                <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                            ) : (
                                <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                            )}
                        </IconButton>
                        <IconButton onClick={playNextTrack} className='icon-button' aria-label="next song">
                            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                        </IconButton>
                    </Box>
                    <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                        <VolumeDownRounded htmlColor={lightIconColor} />
                        <Slider
                            onChange={handleVolumeChange}
                            aria-label="Volume"
                            defaultValue={30}
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                '& .MuiSlider-track': { border: 'none' },
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
    );
};

export default MusicPlayer;
