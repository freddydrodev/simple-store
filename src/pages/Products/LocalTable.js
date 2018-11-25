import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DynamicCell from "../../components/auth/DynamicCell";
import DynamicTable from "../../components/auth/DynamicTable";

class LocalTable extends Component {
  state = {
    columns: [
      {
        title: "Ref",
        dataIndex: "id",
        key: "id",
        width: 80,
        render: (text, record, id) => (
          <DynamicCell value={text} data={record} row="id" />
        )
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text, record) => (
          <DynamicCell value={text} data={record} row="image" />
        )
      },
      {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <DynamicCell value={text} field="text" data={record} row="name" />
        )
      },
      {
        title: "Categorie",
        dataIndex: "category",
        key: "category",
        render: (text, record) => (
          <DynamicCell
            value={text}
            field="select"
            select={this.props.categories.categories}
            data={record}
            row="category"
          />
        )
      },
      {
        title: "Prix",
        dataIndex: "price",
        key: "price",
        render: (text, record) => (
          <DynamicCell value={text} field="number" data={record} row="price" />
        )
      },
      {
        title: "Quantite",
        dataIndex: "quantity",
        key: "quantity",
        render: (text, record) => (
          <DynamicCell
            value={text}
            field="number"
            data={record}
            row="quantity"
          />
        )
      },
      {
        title: "Cree par",
        dataIndex: "madeBy",
        key: "madeBy",
        render: (text, record) => (
          <DynamicCell value={text} data={record} row="" />
        )
      },
      {
        title: "Cree depuis",
        dataIndex: "madeSince",
        key: "madeSince",
        render: (text, record) => (
          <DynamicCell value={moment(text).fromNow()} data={record} row="" />
        )
      }
    ]
  };

  render() {
    return (
      <DynamicTable
        columns={this.state.columns}
        dataSource={this.props.products.products || []}
      />
    );
  }
}

export default connect(({ products, categories }) => ({
  products,
  categories
}))(LocalTable);
