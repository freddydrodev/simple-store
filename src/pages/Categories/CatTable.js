import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCategory } from "../../actions";
import moment from "moment";
import DynamicCell from "../../components/auth/DynamicCell";
import DynamicTable from "../../components/auth/DynamicTable";

class CatTable extends Component {
  state = {
    columns: [
      {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
        render: (text, record, id) => (
          <DynamicCell value={`${id + 1}`} data={record} row="_id" />
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
        dataSource={this.props.categories.categories}
      />
    );
  }
}

export default connect(
  ({ categories }) => ({ categories }),
  { updateCategory: updateCategory }
)(CatTable);
