import axios from "axios";

//const baseURL = 'http://127.0.0.1:3001'; //process.env.REACT_APP_API_BASE_URL;

//console.log('baseURL: ', baseURL)

const client = axios.create({ baseURL: "http://localhost:3001" });

//client.interceptors.response.use((response) => response.data)

export function addTokenToHeaders(AUTH_TOKEN){
    client.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
}


export default client;
