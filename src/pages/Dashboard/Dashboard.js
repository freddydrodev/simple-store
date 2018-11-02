import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { USER_DB } from "../../configs";
import { logUserOut } from "../../actions";

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
        <Button
          type="primary"
          onClick={() => USER_DB.logOut().then(this.props.logout())}
        >
          logout
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { logout: logUserOut }
)(withRouter(Dashboard));
