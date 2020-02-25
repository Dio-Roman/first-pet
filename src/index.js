import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ApiService from "./service/api-service";
import ApiServiceContext from "./components/api-service-context/api-service-context";

ReactDOM.render(
  <ApiServiceContext.Provider value={new ApiService()}>
    <App />
  </ApiServiceContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
