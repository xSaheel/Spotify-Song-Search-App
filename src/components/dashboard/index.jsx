// import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
// import { getItemWithExpiry } from "../../utils";
import SearchBar from "../search-bar";
import classes from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={classes.root}>
      <h1 className={classes.heroText}>Login to listen to top 10 tracks from your favorite artists.</h1>
      <SearchBar />
    </div>
  )
}

export default Dashboard;