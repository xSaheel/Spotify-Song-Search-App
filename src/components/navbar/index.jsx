import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
import { SocialIcon } from "react-social-icons";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    };
    return (
        <div className={classes.navBarRoot}>
            <Logo height={40} fill="white" />
            <button className={classes.loginBtn} onClick={handleLogin}>Login</button>
        </div>
    )
}

export const SideBar = ({ children }) => {
    return (
        <div className={classes.sideBarWrapper}>
            <div className={classes.sideBar}>
                <Logo height={40} fill="white" />
                <hr /> 
                <Link to="/" className={classes.menuItem}>Home</Link>
                <Link to="/" className={classes.menuItem}>My Profile</Link>
                <Link to="/" className={classes.menuItem}>About Dev</Link>
                <hr />  
                <div className={classes.social}>
                    <SocialIcon url="https://github.com/xSaheel" bgColor="white" />
                    <SocialIcon url="https://stackoverflow.com/users/13186678/saheel-das" bgColor="white" />
                    <SocialIcon url="https://www.linkedin.com/in/saheeldas21/" bgColor="white" />
                </div> 
            </div>
            <div className={classes.children}>{children}</div>
        </div>
    )
}

export const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.logoContainer} >
                <Logo height={40} fill="white" />
            </div>
            <div className={classes.aboutSection}>
                <p>Spotify is a digital music service that gives you access to millions of songs. Search for your favorite Artists, Playlists and Songs for free.</p>
                <p style={{marginTop: "1rem"}}>-- Saheel Das.</p>
                <div className={classes.socialContainer}>
                    <SocialIcon url="https://github.com/xSaheel" bgColor="white" />
                    <SocialIcon url="https://stackoverflow.com/users/13186678/saheel-das" bgColor="white" />
                    <SocialIcon url="https://www.linkedin.com/in/saheeldas21/" bgColor="white" />
                </div> 
            </div>
        </div>
    )
}

export default NavBar;