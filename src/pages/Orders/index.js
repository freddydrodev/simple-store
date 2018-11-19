import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import DynamicTable from "../../components/auth/DynamicTable";
import OrdersList from "./OrdersList";
import OrderAddArticleBtn from "./OrdersArticleForm";

class Orders extends Component {
  state = {
    activedItem: 0,
    orders: ["Fredius", "Diomande", "Junior"],
    currentOrder: [{ product: "test", key: "test" }],
    columns: [
      {
        dataIndex: "product",
        title: "Article",
        key: "product",
        render: (text, row, index) => {
          if (index >= this.state.currentOrder.length - 1) {
            return {
              children: <OrderAddArticleBtn />,
              props: { colSpan: 5 }
            };
          }
          return text;
        }
      },
      {
        dataIndex: "price",
        title: "Prix",
        key: "price",
        render: (text, row, index) => this.hideEl(text, row, index)
      },
      {
        dataIndex: "quantity",
        title: "Quantite",
        key: "quantity",
        render: (text, row, index) => this.hideEl(text, row, index)
      },
      {
        dataIndex: "discount",
        title: "Reduction",
        key: "discount",
        render: (text, row, index) => this.hideEl(text, row, index)
      },
      {
        dataIndex: "total",
        title: "Total",
        key: "total",
        render: (text, row, index) => this.hideEl(text, row, index)
      }
    ]
  };

  hideEl = (text, row, index) => {
    if (index >= this.state.currentOrder.length - 1) {
      return {
        props: {
          colSpan: 0
        }
      };
    }
    return text;
  };

  selectOrder = a => this.setState({ activedItem: a });

  render() {
    return (
      <Row style={{ height: "calc(100vh - 72px)" }} type="flex">
        <OrdersList />
        <Col style={{ flex: 1 }} className="bg-white p-3 h-100">
          <h2 className="mb-0 text-primary">TXF18</h2>
          <h3 className="opac-5">28 Dec 2018</h3>
          <div className="flex between">
            <div>
              <h2 className="mb-0">Diomande Dro Freddy Junior</h2>
              <h4 className="opac-5 mb-0">diomande@gmail.com</h4>
            </div>
            <div className="text-right">
              <h2 className="mb-0">42209834</h2>
              <h4 className="opac-5 mb-0">Odokor Glory Land Accra</h4>
            </div>
          </div>
          <Divider type="horizontal">Articles</Divider>
          <DynamicTable
            hideOption
            columns={this.state.columns}
            dataSource={this.state.currentOrder}
          />

          <div span={9} className="text-right">
            <h4 className="pt-3 mb-0 opac-5">Total</h4>
            <h2 className="text-primary total-text">120000 fr</h2>
          </div>
        </Col>
      </Row>
    );
  }
}

export { Orders };
