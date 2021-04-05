import { useEffect, useState } from "react";
import queryString from 'query-string'

const Search = () => {

    const BASE_URL = "https://api.spotify.com/v1/";
    const parsedHash = queryString.parse(window.location.hash);

    const accessToken = parsedHash.access_token;

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [artistId, setArtistId] = useState('');

    useEffect(() => {
        fetch(`${BASE_URL}artists/${artistId}/top-tracks?country=US&`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.tracks);
            setData(data.tracks);
        })
        
    },[artistId])

    const handleSearch = () => {
        fetch(`${BASE_URL}search?q=${encodeURI(query)}&type=artist&limit=1`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => setArtistId(data.artists.items[0].id));

        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    }

    return (
        <div>
            <div className="header">
                <h1><span>H</span>ello</h1>
                <h1><span>S</span>potifier!</h1>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); handleSearch(); e.target.reset();}}>
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input 
                        className="search-bar" 
                        type="text" 
                        placeholder="Search your favourite Artist / Singer..." 
                        name="search-bar"
                        onChange={e => setQuery(e.target.value)}
                        >  
                    </input>
                    <button className="search-btn">Search</button>
                </div>
            </form> 
            <div className="dashboard">
                {data && <h1>Top 10 tracks of {query}</h1>}
                {data && data.map((track, i) => (<p key={i}>{track.name}</p>))}
            </div>
        </div>
    );
}

export default Search;