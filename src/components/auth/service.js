import client, { addTokenToHeaders } from "../../api/client";

//const loginBaseUrl = '/api/auth'

export function login(credentials) {
  const url = "/api/auth/login";
  return client.post(url, credentials).then((AUTH_TOKEN) => {
    addTokenToHeaders(AUTH_TOKEN);
    //guardar el token
  });
}
