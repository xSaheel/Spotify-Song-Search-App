import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArtistDetails, getTopTenSongs } from "../../api";
import Loader from "../loader";
import { SideBar } from "../navbar";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import NotFound from "../not-found";
import classes from "./styles.module.scss";
import { useAudio } from "./useAudio";
// import MusicPlayer from "../music-player";

const Search = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('query');
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
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
                            index={index+1} 
                            track={track}
                            currentSong={currentSong}
                            setCurrentSong={setCurrentSong}
                        />
                    ))}
                </div>
                {/* {currentSong && <MusicPlayer track={currentSong} />} */}
            </div>
        </SideBar>
    );
}

const SongCard = ({index, track, currentSong, setCurrentSong}) => {
    const { name, duration_ms, preview_url, artists } = track;
    const { isPlaying, handlePlay } = useAudio();
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const handlePlayPause = () => {
        setCurrentSong(track)
        handlePlay(preview_url);
    }
    return (
        <div className={classes.song}>
            <div className={classes.index} style={{color: currentSong?.name === name ? "#00c345" : "white" }}>{`#${index}`}</div>
            <div className={classes.content}>
                <div className={classes.trackName} style={{color: currentSong?.name === name ? "#00c345" : "white" }}>{name}</div>
                <div className={classes.artists}>{artists.map((artist, index) => <div>{artist.name}{index === artists.length - 1 ? "" : ","}&nbsp;</div>)}</div>
            </div>
            <div className={classes.duration}>{msToMinutes(duration_ms)}</div>
            {/* <Popularity popularity={track.popularity} /> */}
            <div className={classes.preview}>
                {preview_url ? (
                    <div className={classes.playPauseBtn} onClick={handlePlayPause}>
                        {isPlaying ? <PauseIcon height={22} /> : <PlayIcon height={22} />}
                    </div>) : (<div>--</div>)
                }
            </div>
        </div>
    )
}

// const Popularity = ({popularity}) => {
//     return (
//         <div className={classes.popularityContainer}>
//             <div>{popularity}</div>
//         </div>
//     )
// }

export default Search;