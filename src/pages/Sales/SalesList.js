import React, { Component } from "react";
import { Col, List, Button, Icon } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import PageHeader from "../../components/auth/PageHeader";
import { selectOrder } from "../../actions";
import { DB } from "../../configs";

class SalesList extends Component {
  state = {
    deletable: false
  };

  setDeletable = () => {
    DB.rel.find("orders").then(({ orders }) => {
      const os = orders.filter(o => o.sold);
      if (os.length > 0) {
        selectOrder(os[0]);
        if (!this.state.deletable) {
          this.setState({ deletable: true });
        }
      } else {
        this.setState({ deletable: false });
        selectOrder(null);
      }
    });
  };

  deleteOrder = () => {
    const { sales, selectedOrder } = this.props;
    if (sales) {
      const activedItem = selectedOrder ? selectedOrder : sales.orders[0];
      DB.rel
        .del("orders", activedItem)
        .then(() => {
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
    }
  };

  componentDidMount() {
    const { orders } = this.props.sales;
    if (orders) {
      selectOrder(orders[0] || null);
    }
    this.setDeletable();
  }

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
              {this.state.deletable && (
                <div>
                  <Button
                    icon="delete"
                    shape="circle-outline"
                    type="danger"
                    onClick={this.deleteOrder}
                  />
                </div>
              )}
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
