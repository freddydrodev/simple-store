import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
//relatif import
import "./less/index.less";
import Routes from "./routes";
const store = createStore(reducers);

const rootApp = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(rootApp, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
