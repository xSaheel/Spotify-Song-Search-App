import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import classes from "./styles.module.scss";

const Dashboard = () => {
  const parsedHash = queryString.parse(window.location.hash);
  const accessToken = parsedHash.access_token;

  useEffect(() => {
    if(accessToken) {
      localStorage.setItem("accessToken", accessToken)
    }
  }, [accessToken]);

  return (
    <div className={classes.root}>
      <h1 className={classes.heroText}>Search for millions of songs, artists and podcasts, for free.</h1>
      <SearchBar />
    </div>
  )
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  return (
    <div className={classes.searchWrapper}>
        <i className="fas fa-search"></i>
        <input 
            className="search-bar" 
            type="text" 
            placeholder="Search your favourite Artist / Singer..." 
            name="search-bar"
            onChange={(e) => setQuery(e.target.value)}
        >  
        </input>
        <Link to={`/search?query=${query}`}>
          <button className="search-btn">Search</button>
        </Link>
    </div>
  )
}

export default Dashboard;