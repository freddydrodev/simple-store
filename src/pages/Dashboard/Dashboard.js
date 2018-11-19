import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return <div>Arrive Bientot...</div>;
  }
}

export default connect(null)(withRouter(Dashboard));
