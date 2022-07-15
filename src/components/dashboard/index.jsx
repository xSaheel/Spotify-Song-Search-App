import { useState } from "react";
import { Link } from 'react-router-dom';
import { unknownArtistImageUrl } from "../../constants";
import { useSearch } from "../search/useSearch";
// import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
// import { getItemWithExpiry } from "../../utils";
import classes from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={classes.root}>
      {/* <h1 className={classes.heroText}>Search for millions of songs, artists and podcasts, for free.</h1> */}
      <h1 className={classes.heroText}>Search for your favorite artists &amp; listen to their top 10 tracks.</h1>
      <SearchBar />
    </div>
  )
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  // const handleSearch = () => {
  //   const accessToken = getItemWithExpiry("accessToken");
  //   if(!accessToken) {
  //     window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  //   } else {
  //      window.location.href = `/search?query=${query}`;
  //   }
  // }
  const { artistData } = useSearch(query, 5);
  // const handleSearchSuggestion = (artistName) => {
  //   window.location.href = `/search?query=${artistName}`;
  // }
  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchWrapper}>
          <i className="fas fa-search"></i>
          <input 
              className={classes.searchBar} 
              type="text" 
              placeholder="Search your favorite Artist..." 
              name="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
          >  
          </input>
          <Link to={`/search?query=${query}`}>
            <div className={classes.searchBtn}>Search</div>
          </Link>
      </div>
      {query && artistData && (
        <div className={classes.searchResultWrapper}>
          {artistData.items.map(artist => (
            <Link to={`/search?query=${artist?.name}`}>
              <div className={classes.searchResult}>
                  <img src={artist?.images[0]?.url ?? unknownArtistImageUrl} alt={artist?.name} height={30} width={30} className={classes.thumbnail} />
                  <div>{artist?.name}</div>
                  {artist?.genre && artist?.genre.map(genre => <div>{genre}</div>)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard;