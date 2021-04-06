import { useState } from 'react';

const LoginNav = () => {

    const [navShow, setNavShow] = useState(true);

    const REACT_APP_CLIENT_ID="995b209d3c304fafbdf12221b6bf0857"
    const REACT_APP_AUTHORIZE_URL="https://accounts.spotify.com/authorize"
    const REACT_APP_REDIRECT_URL="https://spotify-song-search-app.herokuapp.com/"
    
    const handleLogin = () => {
      window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
      setNavShow(false);
    };

    const cancelNav = () => {
        setNavShow(false);
    }

    return(
        <div>
            {navShow ? <nav>
                <p><a href="#" onClick={(e) => {e.preventDefault(); handleLogin()}}>Click here!</a> to Login with your Spotify account to continue..</p>
                <i className="fas fa-times" onClick={(e) => {e.preventDefault(); cancelNav()}}></i>
            </nav> : ''}
        </div>
    );
}

export default LoginNav;
