import { useState } from "react";
import { Link } from 'react-router-dom';
import classes from "./styles.module.scss";

const Dashboard = () => {
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
            className={classes.searchBar} 
            type="text" 
            placeholder="Search your favorite Artist..." 
            name="search-bar"
            onChange={(e) => setQuery(e.target.value)}
        >  
        </input>
        <Link to={`/search?query=${query}`}>
          <div className={classes.searchBtn}>Search</div>
        </Link>
    </div>
  )
}

export default Dashboard;