import { useState, useEffect, useRef } from "react";

export const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
    const audioRef = useRef(new Audio());

    const handlePlay = (url) => {
        setCurrentTrackUrl(url);
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if(currentTrackUrl) {
            audioRef.current = new Audio(currentTrackUrl);
            audioRef.current.onended = () => setIsPlaying(false);
        }
    }, [currentTrackUrl]);

    useEffect(() => {
        console.log('isPlaying: ', isPlaying);
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // useEffect(() => {
    //     console.log('useEffect: ', "bruh");
    //     setIsPlaying(false);
    // }, [window.location]);

    useEffect(() => {
        console.log('useEffect: ', audioRef.current);
    });

    return {
        isPlaying,
        handlePlay,
        currentTrackUrl
    }
};