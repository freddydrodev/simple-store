// /*global Android*/
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
import { userLoggedIn, userLoggedOut } from "../actions";
// import { Button, Icon } from "antd";

// const electron = window.require("electron");

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
          this.props.userLoggedIn(userCtx);
        } else {
          if (this.state.isAuth) {
            this.userLoggedOut();
          }
        }
      })
      .then(() => {
        this.setState({ isReady: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isReady: true });
      });
  }

  render() {
    const { currentUser } = this.props;
    const { isReady } = this.state;

    return isReady ? (
      <React.Fragment>
        {/* <div className="titlebar flex">
          <span
            style={{
              display: "flex",
              flex: 1,
              textAlign: "center",
              justifyContent: "center"
            }}
          >
            Bellise Style
          </span>
          <Button
            size="small"
            className="border-0 py-0 rounded-0"
            style={{ height: 20, background: "#ff4d4f", cursor: "pointer" }}
            onClick={() => electron.app.quit()}
          >
            <Icon
              style={{ fontSize: 15, lineHeight: "20px", color: "white" }}
              type="close"
            />
          </Button>
        </div> */}
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
                    <Redirect to="/app/products" />
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

export default connect(
  mapStateToProps,
  { userLoggedIn, userLoggedOut }
)(Routes);
