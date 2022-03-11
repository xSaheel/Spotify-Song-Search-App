import axios from "axios";
import { BASE_URL } from "./constants";

const GET = async (url) => {
    const accessToken = localStorage.getItem("accessToken");    
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };
    return await axios.get(url, {headers}).then(res => res.data);
}

export const getTopTenSongs = async (artistId, accessToken) => {
    const url = `${BASE_URL}artists/${artistId}/top-tracks?country=US&`;
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };
    return await axios.get(url, {headers}).then(res => res.data);
}   

export const getArtistDetails = async (query, accessToken) => {
    const url = `${BASE_URL}search?q=${encodeURI(query)}&type=artist&limit=1`;
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };
    return await axios.get(url, {headers}).then(res => res.data);
}  

export const getUserData = async () => {
    const url = `${BASE_URL}me`;
    return await GET(url);
}   

