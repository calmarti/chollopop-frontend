import axios from "axios";

//const baseURL = 'http://127.0.0.1:3001'; //process.env.REACT_APP_API_BASE_URL;

//console.log('baseURL: ', baseURL)

//OJO: esto de abajo incluye el post a login, lo cual está mal
//axios.defaults.headers.post['Content-type'] = "multipart/form-data"; 


const client = axios.create({ baseURL: "http://localhost:3001" });

client.interceptors.response.use((response) => response.data);

export const addTokenToHeaders = (token) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const deleteTokenFromHeaders = () => {
  delete client.defaults.headers.common["Authorization"];
};





export default client;

