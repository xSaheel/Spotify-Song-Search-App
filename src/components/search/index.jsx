import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArtistDetails, getTopTenSongs } from "../../api";
import Loader from "../loader";
import { SideBar } from "../navbar";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import NotFound from "../not-found";
import classes from "./styles.module.scss";

const Search = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('query');
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const accessToken = localStorage.getItem("accessToken");    

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const data = await getArtistDetails(query, accessToken);
                setArtistData(data.artists);
                console.log('artist ', data);
            } catch (err) {
                setNotFound(true);
                console.log('err: ', err);
            }
        }
        fetchArtistDetails();
    },[]);

    useEffect(() => {
        if (artistData?.items[0]?.id) {
            const fetchTopTenSongs = async () => {
                try {
                    const data = await getTopTenSongs(artistData?.items[0]?.id, accessToken);
                    setIsLoading(false);
                    console.log('data: ', data);
                    setSongData(data.tracks);
                } catch (err) {
                    setIsLoading(false);
                    console.log('err: ', err);
                }
            }
            fetchTopTenSongs();
        }
        if(artistData && !artistData.items.length) {
            console.log('artistData: ', artistData);
            setNotFound(true);
        }
    },[artistData]);

    if(notFound) return <SideBar><NotFound /></SideBar>;
    if(isLoading) return <SideBar><Loader /></SideBar>;

    return (
        <SideBar>
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerThumbnail}>
                        <h2>TOP 10</h2>
                        <div>{artistData.items[0].name}</div>
                    </div>
                    <div className={classes.flexContainer}>
                        <h1>Top 10 tracks of {artistData.items[0].name}</h1>
                        <div>Your daily update of the most played tracks right now - {artistData.items[0].name}.</div>
                    </div>
                    {/* {artistData?.items && <Popularity popularity={artistData?.items[0]?.popularity ?? 80} />} */}
                    {artistData?.items && console.log('artistData: ', artistData)}
                </div>
                <div className={classes.tableHeader}>
                    <div className={classes.index}>#</div>
                    <div className={classes.content}>Title</div>
                    <div className={classes.duration}>Duration</div>
                    <div className={classes.preview}>Preview</div>
                </div>
                <div className={classes.songsContainer}>
                    {songData.map((track, index) => (
                        <SongCard 
                            key={String(index + 1)} 
                            index={index+1} name={track.name} 
                            duration={track.duration_ms} 
                            previewUrl={track.preview_url}  
                            artists={track.artists}
                        />
                    ))}
                </div>
            </div>
        </SideBar>
    );
}

const SongCard = ({index, name, duration, previewUrl, artists}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
    const audioRef = useRef(new Audio());
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const handlePlay = (previewUrl) => {
        console.log('audioRef.current.onended: ', audioRef.current.onended);
        setCurrentTrackUrl(previewUrl);
        setIsPlaying(!isPlaying);
        // const audio = new Audio(previewUrl);
        // console.log('audio: ', audio);
        // audio.play();
    }
    useEffect(() => {
        if(currentTrackUrl) {
            audioRef.current = new Audio(previewUrl);
            console.log('audioRef.current: ', audioRef.current);
        }
    }, [currentTrackUrl]);
    useEffect(() => {
        if(isPlaying) {
            console.log('isPlaying: ', isPlaying);
            audioRef.current.play();
        } else {
            // audioRef.current.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        console.log('audioRef.current.onended: ', audioRef.current.onended);
        if(audioRef.current.onended) {
            setIsPlaying(false);
        }
    }, [audioRef.current.onended]);

    return (
        <div className={classes.song}>
            <div className={classes.index}>{`#${index}`}</div>
            <div className={classes.content}>
                <div className={classes.trackName}>{name}</div>
                <div className={classes.artists}>{artists.map((artist, index) => <div>{artist.name}{index === artists.length - 1 ? "" : ","}&nbsp;</div>)}</div>
            </div>
            <div className={classes.duration}>{msToMinutes(duration)}</div>
            {/* <Popularity popularity={track.popularity} /> */}
            <div onClick={() => handlePlay(previewUrl)} className={classes.preview}>
                {previewUrl ? (
                    <div className={classes.playPauseBtn}>
                        {isPlaying ? <PauseIcon height={22} /> : <PlayIcon height={22} />}
                    </div>) : (<div>--</div>)
                }
            </div>
        </div>
    )
}

const Popularity = ({popularity}) => {
    return (
        <div className={classes.popularityContainer}>
            <div>{popularity}</div>
        </div>
    )
}

export default Search;