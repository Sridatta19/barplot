import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/index.css";

ReactDOM.render(
  <App initialCount={60} finalCount={68} time={2000} />,
  document.getElementById("root")
);
