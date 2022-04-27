import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";

//TODO: limpiar, depurar: continuar en .gitignore
//TODO: Redactar el mejor README.md posible
//TODO: Crear el build y desplegar en AWS (subir tanto el build como el backend de David) 
// y dejar claro en el README.md quien hizo el backend 
//TODO: arreglar warnings!!!

//TODO: EXTRAS: 
//TODO: implementar filtro de precios (usar lo de Alejandro)




const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);

ReactDOM.render(
  <App isAlreadyLogged={!!token} />,
  document.getElementById("root")
);
