import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
import { SocialIcon } from "react-social-icons";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from 'query-string'
import { getUserData } from "../../api";
import { getItemWithExpiry, setItemWithExpiry } from "../../utils";

const NavBar = () => {
    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    };
    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };
    const [userData, setUserData] = useState(null);
    const parsedHash = queryString.parse(window.location.hash);

    const fetchUserDetails = async () => {
        try {
            const res = await getUserData();
            setUserData(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const accessToken = getItemWithExpiry("accessToken");
        if (accessToken) {
            fetchUserDetails();
        }
    }, []);

    useEffect(() => {
        const accessToken = parsedHash.access_token;
        if(accessToken) {
            setItemWithExpiry("accessToken", accessToken, 3600000);
            fetchUserDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location]);

    return (
        <div className={classes.navBarRoot}>
            <Logo height={40} fill="white" />
            <div className={classes.greetContainer}>
                {userData ? <div className={classes.greet}>{`Hi, ${userData.display_name}`}</div> : <button className={classes.loginBtn} onClick={handleLogin}>Login</button>}
                {userData &&  <button className={classes.loginBtn} onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export const SideBar = ({ children }) => {
    return (
        <div className={classes.sideBarWrapper}>
            <div className={classes.sideBar}>
                <Link to="/" style={{cursor: "pointer"}}>
                    <Logo height={40} fill="white" />
                </Link>
                <hr /> 
                <Link to="/" className={classes.menuItem}>Home</Link>
                <Link href="https://saheeldas.netlify.app/" className={classes.menuItem}>My Profile</Link>
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
                <p>Spotify is a digital music service that gives you access to millions of songs. This website is just for educational purposes.</p>
                <p>Made with &#10084;&#65039; by Saheel Das with React.</p>
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