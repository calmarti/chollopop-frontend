import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";

//TODO: redirección tras DELETE /adverts/:id
//TODO: endpoint POST /adverts
//TODO: endpoint de tags
//TODO: chequear que el logout funcione
//TODO: chequear de nuevo redirección del signup


const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);

ReactDOM.render(
  <App isAlreadyLogged={!!token} />,
  document.getElementById("root")
);
