import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import PrivateFlow from "./PrivateFlow";
import AuthFlow from "./AuthFlow";
import { USER_DB } from "../configs";
import LoadingScreen from "../components/common/LoadingScreen";
import * as actions from "../actions";

class Routes extends Component {
  state = {
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
          this.props.logUserIn(userCtx);
        } else {
          if (this.state.isAuth) {
            this.logUserOut();
          }
        }
      })
      .catch(err => console.warn)
      .then(() => {
        this.setState({ isReady: true });
      });
  }

  render() {
    const { currentUser } = this.props;
    const { isReady } = this.state;

    return isReady ? (
      <React.Fragment>
        <div className="titlebar">Simple Store</div>
        <div className="container">
          <Router>
            <Switch>
              <Route
                path="/app"
                render={props =>
                  currentUser ? <PrivateFlow {...props} /> : <Redirect to="/" />
                }
              />
              <Route
                path="/"
                render={props =>
                  !currentUser ? (
                    <AuthFlow {...props} />
                  ) : (
                    <Redirect to="/app" />
                  )
                }
              />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

// const mapActionToProps = () => {};

export default connect(
  mapStateToProps,
  actions
)(Routes);
