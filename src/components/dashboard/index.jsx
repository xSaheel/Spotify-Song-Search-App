// import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
// import { getItemWithExpiry } from "../../utils";
import SearchBar from "../search-bar";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import classes from "./styles.module.scss";
import { useState } from "react";
import { useAuth } from "../navbar/useAuth";

const modalImg = "https://www.sheerid.com/shoppers/wp-content/uploads/sites/4/2020/05/spotify-deal-page-467x316.jpg";

const Dashboard = () => {
  const { handleLogin, userData } = useAuth();
  console.log('userData: ', userData);
  console.log('bruh: ', !userData);
  const [isOpen, setIsOpen] = useState(!userData);
  return (
    <div className={classes.root}>
      <h1 className={classes.heroText}>Login to listen to top 10 tracks from your favorite artists.</h1>
      <SearchBar />
      <Modal open={isOpen} center onClose={() => setIsOpen(false)} closeIcon={<></>} closeOnOverlayClick={false} classNames={{
          modal: classes.modal
        }}> 
        <img src={modalImg} alt="modal-img" height={200} width="100%" style={{ objectFit: "cover" }} />
        <div className={classes.content}>
          <h2>Please login to Continue!</h2>
          <p>Login to your Spotify account to access this App</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard;