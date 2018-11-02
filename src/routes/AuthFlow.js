import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

class AuthFlow extends Component {
  state = {
    flow: [
      {
        component: Register,
        path: "/register"
      },
      {
        component: Login,
        path: "/"
      }
    ]
  };
  render() {
    return (
      <Switch>
        {this.state.flow.map(r => (
          <Route key={r.path} {...r} />
        ))}
      </Switch>
    );
  }
}

export default AuthFlow;
