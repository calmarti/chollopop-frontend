import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";

//TODO: para desplegar primera versión:
//TODO: 1.- crear un componente card para cada anuncio de la lista
//TODO: 2.5 .-  borrar todos los anuncios sin foto y subir muestra de 10 anuncios o así (con foto)
//TODO: 3.- estilar todo con Bootstrap
//TODO: 5.- limpiar, depurar y meter PropTypes en todos los componentes
//TODO: 6.- Redactar el mejor README.md posible
//TODO: 7.- Crear el build (con o sin Docker) y desplegar en IONOS o en AWS (subir tanto el build como el backend de David) 
// y dejar claro en el README.md quien hizo el backend 
//TODO: EXTRAS: 
//TODO: 4.- Paginar con librería
//TODO: -Dockerizar la aplicación (revisitar tutorial de Docker de freecodecamp)


const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);

ReactDOM.render(
  <App isAlreadyLogged={!!token} />,
  document.getElementById("root")
);
