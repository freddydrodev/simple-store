import React, { Component } from "react";
import { Row } from "antd";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";

class Orders extends Component {
  state = {};

  render() {
    return (
      <Row style={{ height: "calc(100vh - 50px)" }} type="flex">
        <OrdersList />
        <OrderDetails />
      </Row>
    );
  }
}

export { Orders };
