import React, { Component } from "react";
import { Col, List, Button, Icon } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import PageHeader from "../../components/auth/PageHeader";
import OrderCreateForm from "./OrderCreateForm";
import { selectOrder } from "../../actions";
import { DB } from "../../configs";

class OrdersList extends Component {
  deleteOrder = () => {
    const { orders, selectedOrder } = this.props;
    const activedItem = selectedOrder ? selectedOrder : orders[0];
    DB.rel.del("orders", activedItem);
  };
  render() {
    const { orders, selectOrder, selectedOrder } = this.props;
    const activedItem = selectedOrder ? selectedOrder : orders[0];
    return (
      <Col style={{ width: 350 }} className="h-100">
        <List
          header={
            <div className="flex middle w-100 between px-3">
              <PageHeader
                title="Orders"
                hideModal
                titleStyle={{ marginBottom: 0 }}
              />
              <div>
                <OrderCreateForm />
                <Button
                  icon="shopping-cart"
                  shape="circle-outline"
                  type="success"
                  className="mr-2"
                />
                <Button
                  icon="delete"
                  shape="circle-outline"
                  type="danger"
                  onClick={this.deleteOrder}
                />
              </div>
            </div>
          }
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(item, i) => {
            const client = "Fred";
            console.log(client);
            return (
              <List.Item
                actions={[
                  <span>
                    <Icon type="shopping" className="mr-2" />
                    12 articles
                  </span>,
                  <span>
                    <Icon type="wallet" className="mr-2" />
                    120000 Fr
                  </span>
                ]}
                className={`px-3 py-2 pointer ${item.id === activedItem.id &&
                  "bg-white"}`}
                onClick={() => {
                  selectOrder(item);
                }}
              >
                <List.Item.Meta
                  title={
                    <span
                      className="flex between middle"
                      style={{ height: 32 }}
                    >
                      <span className="small text-primary">{item.id}</span>
                      <p className="small mb-0">
                        {moment(item.createAt).fromNow()}
                      </p>
                    </span>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Col>
    );
  }
}

export default connect(
  ({ orders, selectedOrder }) => ({
    orders,
    selectedOrder
  }),
  { selectOrder }
)(OrdersList);
