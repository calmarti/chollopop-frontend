import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

client.interceptors.response.use((response) => response.data);

export const addTokenToHeaders = (token) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const deleteTokenFromHeaders = () => {
  delete client.defaults.headers.common["Authorization"];
};


export default client;

