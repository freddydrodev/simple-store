import React, { Component } from "react";
import LocalForm from "./LocalForm";
import LocalTable from "./LocalTable";
import PageHeader from "../../components/auth/PageHeader";
import { Row, Col, List, Button, Icon, DatePicker, Radio } from "antd";
import DynamicTable from "../../components/auth/DynamicTable";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
          console.log(index, this.state.currentOrder.length);
          if (index >= this.state.currentOrder.length - 1) {
            console.log("entered");
            return {
              children: (
                <span className="p-2 w-100 flex">
                  <Button icon="plus" block type="dashed" />
                </span>
              ),
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
    console.log(text, row, index, this.state.currentOrder.length);
    if (index >= this.state.currentOrder.length - 1) {
      console.log("entered other");
      return {
        props: {
          colSpan: 0
        }
      };
    }
    return text;
  };

  render() {
    return (
      <Row style={{ height: "calc(100vh - 72px)" }} type="flex">
        <Col style={{ width: 350 }} className="h-100">
          <List
            footer={
              <div className="text-center">
                <Button
                  icon="plus"
                  size="large"
                  type="primary"
                  shape="circle"
                />
              </div>
            }
            itemLayout="vertical"
            dataSource={this.state.orders}
            renderItem={(item, i) => (
              <List.Item
                actions={[
                  <span>
                    <Icon type="shopping" className="mr-2" />
                    12 articles
                  </span>,
                  <span>
                    <Icon type="car" className="mr-2" />
                    Livraison
                  </span>,
                  <span>
                    <Icon type="wallet" className="mr-2" />
                    120000 Fr
                  </span>
                ]}
                className={`px-3 py-2 pointer ${i === this.state.activedItem &&
                  "bg-white"}`}
                onClick={() => {
                  this.setState({ activedItem: i });
                }}
              >
                <List.Item.Meta
                  title={
                    <span
                      className="flex between middle"
                      style={{ height: 32 }}
                    >
                      <span className="small text-primary">TXF18</span>
                      <Button
                        icon="star"
                        shape="circle"
                        className="border-0 bg-transparent"
                      />
                    </span>
                  }
                  description={
                    <React.Fragment>
                      <div className="flex between">
                        <h4 className="mb-0">Diomande Dro Freddy Junior</h4>
                        <p className="small mb-0">3 min ago</p>
                      </div>
                    </React.Fragment>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col style={{ flex: 1 }} className="bg-white p-3 h-100">
          <h2 className="mb-0 text-primary">TXF18</h2>
          <h1 className="mb-0">Diomande Dro Freddy Junior</h1>
          <h3>Articles</h3>
          <DynamicTable
            hideOption
            columns={this.state.columns}
            dataSource={this.state.currentOrder}
          />

          <Row>
            <Col span={12}>
              <h4 className="pt-3">Livraisons</h4>
              <RadioGroup onChange={console.log} defaultValue="sans">
                <RadioButton value="sans">Sans livraison</RadioButton>
                <RadioButton value="abidjan">Livraison a Abidjan</RadioButton>
                <RadioButton value="interieur">
                  Livraison a linterieur
                </RadioButton>
                <RadioButton value="exterieur">
                  Livraison a l'exterieur
                </RadioButton>
              </RadioGroup>
              <DatePicker className="mt-2" style={{ width: 570 }} />
            </Col>
            <Col span={12} className="text-right">
              <h4 className="pt-3">Total</h4>
              <h2 className="text-primary total-text">120000 fr</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export { Orders };
