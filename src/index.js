import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";


//TODO: bug importante en el back: manda undefined (token caducado) como AUTH_TOKEN y aun asi lo deja pasar: proteger las rutas

//TODO: ajustar DELETE /adverts/:id
//TODO: redirección tras DELETE /adverts/:id
//TODO: endpoint POST /adverts
//TODO: chequear de nuevo redirección del signup


const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);

ReactDOM.render(
  <App isAlreadyLogged={!!token} />,
  document.getElementById("root")
);
