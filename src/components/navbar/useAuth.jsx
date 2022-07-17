import { useState, useEffect } from "react";
import { REACT_APP_AUTHORIZE_URL, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } from "../../config";
import queryString from 'query-string';
import { getUserData } from "../../api";
import { getItemWithExpiry, setItemWithExpiry } from "../../utils";

export const useAuth = () => {
    const [userData, setUserData] = useState(null);
    const parsedHash = queryString.parse(window.location.hash);

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    };

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };

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

    return {
        handleLogin,
        handleLogout,
        userData
    }
};