import React from "react";
import ReactDOM from "react-dom";

import io from "socket.io-client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
io("http://localhost:43436").on("data", data =>
  store.dispatch({
    type: "socket",
    data: data
  })
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export default store;
