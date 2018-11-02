import React, { Component } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { USER_DB } from "../../configs";

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
        <Button
          type="primary"
          onClick={() => USER_DB.logOut().then(this.props.history.push("/"))}
        >
          logout
        </Button>
      </div>
    );
  }
}

export default withRouter(Dashboard);
