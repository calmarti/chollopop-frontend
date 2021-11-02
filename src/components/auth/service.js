import storage from "../../utils/storage";
import client, { addTokenToHeaders } from "../../api/client";

const loginBaseUrl = "/api/auth";

export function login(credentials) {
  const url = `${loginBaseUrl}/login`;
  return client
    .post(url, credentials)
    .then(({ accessToken }) => {
      addTokenToHeaders(accessToken);
      storage.set("AUTH_TOKEN", accessToken);
    })
    .catch((error) => {
      //console.log(error)
      throw error;
      //gestionar todos los posibles errores
    });
}

export const logout = () => {
  return new Promise (function(resolve){
    //valorar si en este caso también falta quitar el token de los headers (supongo que sí ya que David lo hace!)
    storage.remove("AUTH_TOKEN");
    resolve();
  })
}

