import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { addTokenToHeaders } from "./api/client";


const token = storage.get("AUTH_TOKEN");
addTokenToHeaders(token);

ReactDOM.render(
  <App isAlreadyLogged={!!token} />,
  document.getElementById("root")
);
