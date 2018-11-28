import React, { Component } from "react";
import { Row } from "antd";
import SalesList from "./SalesList";
import SaleDetails from "./SaleDetails";

class Sales extends Component {
  state = {};

  render() {
    return (
      <Row style={{ height: "calc(100vh - 50px)" }} type="flex">
        <SalesList />
        <SaleDetails />
      </Row>
    );
  }
}

export { Sales };
