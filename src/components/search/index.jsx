import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getArtistDetails, getTopTenSongs } from "../../api";
import Loader from "../loader";
import { SideBar } from "../navbar";
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
                // setArtistId(data.artists.items[0].id);
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
                        <div>{query}</div>
                    </div>
                    <div className={classes.flexContainer}>
                        <h1>Top 10 tracks of {query}</h1>
                        <div>Your daily update of the most played tracks right now - {query}.</div>
                    </div>
                    {/* {artistData?.items && <Popularity popularity={artistData?.items[0]?.popularity ?? 80} />} */}
                    {artistData?.items && console.log('artistData: ', artistData)}
                </div>
                <div className={classes.songsContainer}>
                    {songData.map((track, index) => (<div className={classes.song}>
                        <div>{`#${index + 1}`}</div>
                        <div key={String(index + 1)}>{track.name}</div>
                    </div>))}
                </div>
            </div>
        </SideBar>
    );
}

const Popularity = (popularity) => {
    return (
        <div className={classes.popularityContainer}>
            <h2>{popularity}</h2>
        </div>
    )
}

export default Search;