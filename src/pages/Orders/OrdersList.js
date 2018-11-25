import React, { Component } from "react";
import { Col, List, Button, Icon } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import PageHeader from "../../components/auth/PageHeader";
import OrderCreateForm from "./OrderCreateForm";
import { selectOrder } from "../../actions";
import { DB } from "../../configs";

class OrdersList extends Component {
  state = {
    deletable: false
  };

  setDeletable = () => {
    DB.rel.find("orders").then(({ orders }) => {
      const os = orders.filter(o => !o.sold);
      if (os.length > 0) {
        selectOrder(os[0]);
        if (!this.state.deletable) {
          console.log("ici");
          this.setState({ deletable: true });
        }
      } else {
        this.setState({ deletable: false });
        selectOrder(null);
      }
    });
  };

  deleteOrder = () => {
    const { orders, selectedOrder } = this.props;
    const activedItem = selectedOrder ? selectedOrder : orders[0];
    DB.rel
      .del("orders", activedItem)
      .then(res => {
        console.log(activedItem);
        this.setDeletable();
        activedItem.products.forEach(prod => {
          DB.rel.find("products", prod).then(({ products }) => {
            const product = products[0];
            product.quantity += activedItem[prod];
            DB.rel.save("products", product);
          });
        });
      })
      .catch(() => {});
  };

  sold = () => {
    const { selectedOrder } = this.props;
    // const activedItem = selectedOrder ? selectedOrder : orders[0];
    if (selectedOrder) {
      selectedOrder.sold = true;
      DB.rel.save("orders", selectedOrder).then(res => {
        this.setDeletable();
      });
    } else {
      console.log("[NOT ORDER SELECTED]");
    }
  };

  componentDidMount() {
    this.setDeletable();
  }

  render() {
    const { orders, selectOrder, selectedOrder } = this.props;

    return (
      <Col style={{ width: 350 }} className="h-100">
        <List
          header={
            <div className="flex middle w-100 between px-3">
              <PageHeader
                title="Commandes"
                hideModal
                titleStyle={{ marginBottom: 0 }}
              />
              <div>
                <OrderCreateForm setDeletable={this.setDeletable} />

                {this.state.deletable && (
                  <React.Fragment>
                    <Button
                      icon="shopping-cart"
                      shape="circle-outline"
                      type="success"
                      className="mr-2"
                      onClick={this.sold}
                    />
                    <Button
                      icon="delete"
                      shape="circle-outline"
                      type="danger"
                      onClick={this.deleteOrder}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          }
          itemLayout="vertical"
          dataSource={orders.orders}
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
  ({ orders, selectedOrder }) => ({
    orders,
    selectedOrder
  }),
  { selectOrder }
)(OrdersList);
