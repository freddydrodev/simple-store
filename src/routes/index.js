import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateFlow from "./PrivateFlow";
import AuthFlow from "./AuthFlow";
import { USER_DB } from "../configs";
import LoadingScreen from "../components/common/LoadingScreen";

class Routes extends Component {
  state = {
    isAuth: false,
    isReady: false,
    flow: [
      {
        component: PrivateFlow,
        path: "/app"
      },
      {
        component: AuthFlow,
        path: "/"
      }
    ]
  };

  async componentDidMount() {
    USER_DB.getSession()
      .then(({ userCtx }) => {
        if (userCtx.name) {
          this.setState({ isAuth: true });
        } else {
          if (this.state.isAuth) {
            this.setState({ isAuth: false });
          }
        }
      })
      .catch(err => console.warn)
      .then(() => {
        this.setState({ isReady: true });
      });
  }

  render() {
    const { isAuth, isReady } = this.state;
    return isReady ? (
      <Switch>
        <Route
          path="/app"
          render={props =>
            isAuth ? <PrivateFlow {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          path="/"
          render={props =>
            !isAuth ? <AuthFlow {...props} /> : <Redirect to="/app" />
          }
        />
      </Switch>
    ) : (
      <LoadingScreen />
    );
  }
}

export default Routes;
