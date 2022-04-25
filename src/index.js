import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";

//TODO: para desplegar primera versión:
//TODO: 1.- crear un componente card para cada anuncio de la lista, luego centrar y estilar listra
//TODO: 2.- estilar detalle y creación del anuncio
//TODO: 2.5.- estilar MODAL! y footer
//TODO: 3.- limpiar, depurar y meter PropTypes en todos los componentes
//TODO: 4.- borrar todos los anuncios sin foto y subir muestra de 10 anuncios o así (con fotos del mismo tamaño)
//TODO: 5.- Redactar el mejor README.md posible
//TODO: 6.- Crear el build (con o sin Docker) y desplegar en IONOS o en AWS (subir tanto el build como el backend de David) 
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
