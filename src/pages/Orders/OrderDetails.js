import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Divider, Button } from "antd";
import moment from "moment";
import DynamicTable from "../../components/auth/DynamicTable";
import OrderAddArticleBtn from "./OrdersArticleForm";
import DynamicCell from "../../components/auth/DynamicCell";
import { DB } from "../../configs";
import { selectOrder } from "../../actions";

class OrderDetails extends Component {
  state = {
    products: [],
    activedItem: 0,
    currentOrder: [
      {
        name: "_addField_",
        price: "_addField_",
        key: "_addField_",
        quantity: "_addField_",
        total: "_addField_"
      }
    ],
    columns: [
      {
        dataIndex: "name",
        title: "Article",
        key: "name",
        render: (text, record, index) => {
          if (index >= this.state.currentOrder.length - 1) {
            return {
              children: <OrderAddArticleBtn />,
              props: { colSpan: 6 }
            };
          }
          return <DynamicCell value={text} data={record} row="name" />;
        }
      },
      {
        dataIndex: "price",
        title: "Prix",
        key: "price",
        render: (text, record, index) =>
          this.hideEl(text, record, index, "price")
      },
      {
        dataIndex: "quantity",
        title: "Quantite",
        key: "quantity",
        render: (text, record, index) =>
          this.hideEl(text, record, index, record.id, "number")
      },
      {
        dataIndex: "total",
        title: "Total",
        key: "total",
        render: (text, record, index) => this.hideEl(text, record, index)
      },
      {
        dataIndex: "option",
        title: "Option",
        key: "option",
        custom: true,
        width: 80,
        align: "center",
        render: (a, r, i) => {
          console.log(a, r, i);
          if (i >= this.state.currentOrder.length - 1) {
            return {
              props: {
                colSpan: 0
              }
            };
          }

          return (
            <span className="p-1 block">
              <Button
                size="small"
                type="danger"
                icon="delete"
                title="Supprimer"
                style={{ fontSize: 14 }}
                onClick={() => this.deleteDataHandler(r.id)}
              />
            </span>
          );
        }
      }
    ]
  };

  deleteDataHandler = id => {
    //create a new copy of the selected order
    const selectedOrder = { ...this.props.selectedOrder };
    const toAdd = selectedOrder[id];

    //remove the key from the selected order
    delete selectedOrder[id];

    //get a new array with the remaining
    const products = selectedOrder.products.filter(p => p !== id);
    selectedOrder.products = products;
    selectedOrder.total = this.getTotal(selectedOrder);
    this.props.selectOrder(selectedOrder);

    DB.rel.save("orders", selectedOrder).then(() => {
      DB.rel.find("products", id).then(({ products }) => {
        const product = products[0];
        product.quantity += toAdd;

        DB.rel.save("products", product);
      });
    });
  };

  hideEl = (text, record, index, row, type) => {
    // console.log("[RECORD]", record);
    if (index >= this.state.currentOrder.length - 1) {
      return {
        props: {
          colSpan: 0
        }
      };
    }

    return (
      <DynamicCell
        customChange={this.customChange}
        max={record.max}
        value={text}
        data={record}
        field={type || "read"}
        row={row || "id"}
      />
    );
  };

  customChange = (a, prod, value) => {
    console.log(a);
    if (!!value) {
      //update the article quantity
      const selectedOrder = this.props.selectedOrder;
      selectedOrder[prod] = value;

      //update the order total
      selectedOrder.total = this.getTotal(selectedOrder);

      DB.rel
        .save("orders", selectedOrder)
        .then(({ orders }) => this.props.selectOrder(orders[0]))
        .then(() => {
          DB.rel.find("products", prod).then(({ products }) => {
            const product = products[0];
            const reducer = value - a.quantity;
            product.quantity = product.quantity - reducer;

            DB.rel.save("products", product);
          });
        });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { orders } = nextProps;
    // console.log(prevState.selectedOrder, nextProps.selectedOrder);
    let selectedOrder =
      prevState.selectedOrder !== nextProps.selectedOrder
        ? nextProps.selectedOrder
        : prevState.selectedOrder;
    if (selectedOrder) {
      if (selectedOrder.products.length > 0) {
        const currentOrder = [
          ...selectedOrder.products.map(prodID => {
            if (!orders.products) {
              return null;
            }
            return orders.products
              .filter(op => op.id === prodID)
              .map(prod => ({
                ...prod,
                key: prodID,
                max: prod.quantity + selectedOrder[prodID],
                quantity: selectedOrder[prodID],
                total: prod.price * selectedOrder[prodID]
              }))[0];
          }),
          { product: "_addField_", key: "_addField_" }
        ]; //add the btn at the end
        // console.log(currentOrder);
        return { currentOrder };
      }
      // console.log("[Derived]", nextProps);
      return { currentOrder: [{ product: "_addField_", key: "_addField_" }] };
    } else {
      return { currentOrder: [{ product: "_addField_", key: "_addField_" }] };
    }
  }

  getTotal = selectedOrder => {
    // sil na pas delement
    if (!!!selectedOrder.products.length) {
      return 0;
    }

    const total = selectedOrder.products
      .map(
        key =>
          selectedOrder[key] *
          this.props.orders.products.filter(prod => prod.id === key)[0].price
      )
      .reduce((a, b) => a + b);

    return total;
  };

  displayDetails = () => {
    const { selectedOrder, orders } = this.props;
    const client = orders.clients
      ? orders.clients.filter(client => {
          return client.id === selectedOrder.client;
        })[0]
      : null;

    // console.log(orders.products);
    return client && !selectedOrder.sold ? (
      <Col style={{ flex: 1 }} className="bg-white p-3 h-100">
        <h2 className="mb-0 text-primary">{selectedOrder.id}</h2>
        <h3 className="opac-5 small">
          {moment(selectedOrder.createdAt).format("dddd, Do MMMM YYYY, HH:mm")}
        </h3>
        <div className="flex between">
          <div>
            <h2 className="mb-0">{client.name || "Aucun name"}</h2>
            <h4 className="opac-5 mb-0">{client.email || "Aucun email"}</h4>
          </div>
          <div className="text-right">
            <h2 className="mb-0">{client.contact}</h2>
            <h4 className="opac-5 mb-0">
              {client.location || "Aucune addresse"}
            </h4>
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
          <h2 className="text-primary total-text mb-0">
            {selectedOrder.total} fr
          </h2>
        </div>
      </Col>
    ) : (
      this.defaultMessage()
    );
  };

  defaultMessage = () => (
    <Col style={{ flex: 1 }} className="bg-white p-3 h-100">
      <p className="flex h-100  center middle">
        Selectionnez ou creez une commande
      </p>
    </Col>
  );

  render() {
    const { selectedOrder, orders } = this.props;

    return selectedOrder && orders
      ? this.displayDetails()
      : this.defaultMessage();
  }
}

export default connect(
  ({ orders, selectedOrder }) => ({
    orders,
    selectedOrder
  }),
  { selectOrder }
)(OrderDetails);
