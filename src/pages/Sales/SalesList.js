import React, { Component } from "react";
import { Col, List, Button, Icon } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import PageHeader from "../../components/auth/PageHeader";
import OrderCreateForm from "./OrderCreateForm";
import { selectOrder } from "../../actions";
import { DB } from "../../configs";

class SalesList extends Component {
  deleteOrder = () => {
    const { Sales, selectedOrder, selectOrder } = this.props;
    const activedItem = selectedOrder ? selectedOrder : Sales[0];
    DB.rel
      .del("orders", activedItem)
      .then(() => {
        DB.rel.find("orders").then(({ orders }) => {
          if (orders.length > 0) {
            selectOrder(orders[0]);
          } else {
            selectOrder(null);
          }
        });
      })
      .catch(() => {});
  };

  // sold = () => {
  //   const { selectedOrder } = this.props;
  //   // const activedItem = selectedOrder ? selectedOrder : Sales[0];
  //   if (selectedOrder) {
  //     selectedOrder.sold = true;
  //     DB.rel.save("Sales", selectedOrder).then(res => {
  //       console.log(res);
  //     });
  //   } else {
  //     console.log("[NOT ORDER SELECTED]");
  //   }
  // };

  render() {
    const { sales, selectOrder, selectedOrder } = this.props;

    return (
      <Col style={{ width: 350 }} className="h-100">
        <List
          header={
            <div className="flex middle w-100 between px-3">
              <PageHeader
                title="Ventes"
                hideModal
                titleStyle={{ marginBottom: 0 }}
              />
              <div>
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
          dataSource={sales.orders}
          renderItem={(item, i) => {
            return (
              <List.Item
                actions={[
                  <span>
                    <Icon type="shopping" className="mr-2" />
                    {item.products.length} articles
                  </span>,
                  <span>
                    <Icon type="wallet" className="mr-2" />
                    {item.total || 0} Fr
                  </span>
                ]}
                className={`px-3 py-2 pointer ${selectedOrder &&
                  item.id === selectedOrder.id &&
                  "bg-white"}`}
                onClick={() => selectOrder(item)}
              >
                <List.Item.Meta
                  title={
                    <span
                      className="flex between middle"
                      style={{ height: 32 }}
                    >
                      <span className="small text-primary">{item.id}</span>
                      <p className="small mb-0">
                        {moment(item.createdAt).fromNow()}
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
  ({ sales, selectedOrder }) => ({
    sales,
    selectedOrder
  }),
  { selectOrder }
)(SalesList);
