import storage from "../../utils/storage";
import client, { addTokenToHeaders } from "../../api/client";

const authBaseUrl = "/api/auth";

export function login({ remember, ...credentials }) {
  const url = `${authBaseUrl}/login`;
  return client
    .post(url, credentials)
    .then(({ accessToken }) => {
      addTokenToHeaders(accessToken);
      return accessToken;
    })
    .then((accessToken) => {
      if (remember) {
        storage.set("AUTH_TOKEN", accessToken);
      }
    })
    .catch((error) => {
      throw error;
    });
}

export const logout = () => {
  return new Promise(function (resolve) {
    storage.remove("AUTH_TOKEN");
    resolve();
  });
};


export function signUp(data) {
  const url = `${authBaseUrl}/signup`;
  return client.post(url, data);
}