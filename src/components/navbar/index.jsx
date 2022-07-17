import { SocialIcon } from "react-social-icons";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

const NavBar = ({ children }) => {
    const { userData, handleLogin, handleLogout } = useAuth();
    return (
        <>
            <div className={classes.navBarRoot}>
                <Logo height={40} fill="white" />
                <div className={classes.greetContainer}>
                    {userData ? <div className={classes.greet}>{`Hi, ${userData.display_name}`}</div> : <button className={classes.loginBtn} onClick={handleLogin}>Login</button>}
                    {userData &&  <button className={classes.loginBtn} onClick={handleLogout}>Logout</button>}
                </div>
            </div>
            {children}
            <Footer />
        </>
    )
}

export const SideBar = ({ children }) => {
    const { userData } = useAuth();
    return (
        <div className={classes.sideBarWrapper}>
            <div className={classes.sideBar}>
                <Link to="/" style={{cursor: "pointer"}}>
                    <Logo height={40} fill="white" />
                </Link>
                {userData && <div className={classes.greet}>{`Hi, ${userData.display_name}`}</div>}
                <hr /> 
                <Link to="/" className={classes.menuItem}>Home</Link>
                <Link to={{ pathname: "https://saheeldas.netlify.app/" }} target="_blank" className={classes.menuItem}>About Dev</Link>
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

const Footer = () => {
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