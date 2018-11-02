import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories/Categories";

class PrivateFlow extends Component {
  state = {
    flow: [
      {
        component: Categories,
        path: this.props.match.url + "/categories"
      },
      {
        component: Dashboard,
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

export default PrivateFlow;
