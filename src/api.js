import axios from "axios";
import { BASE_URL } from "./constants";
import { getItemWithExpiry } from "./utils";

const GET = async (url) => {
    const accessToken = getItemWithExpiry("accessToken"); 
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };
    return await axios.get(url, {headers}).then(res => res.data);
}

export const getTopTenSongs = async (artistId) => {
    const url = `${BASE_URL}artists/${artistId}/top-tracks?country=US&`;
    return await GET(url);
}   

export const getArtistDetails = async (query, limit) => {
    const url = `${BASE_URL}search?q=${encodeURI(query)}&type=artist&limit=${limit}`;
    return await GET(url);
}  

export const getUserData = async () => {
    const url = `${BASE_URL}me`;
    return await GET(url);
}   

