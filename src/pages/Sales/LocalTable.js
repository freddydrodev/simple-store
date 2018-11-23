import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DynamicCell from "../../components/auth/DynamicCell";
import DynamicTable from "../../components/auth/DynamicTable";

class LocalTable extends Component {
  state = {
    columns: [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 50,
        render: (text, record, id) => (
          <DynamicCell value={id + 1} data={record} row="id" />
        )
      },
      {
        title: "Nom Complet",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <DynamicCell value={text} field="text" data={record} row="name" />
        )
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => (
          <DynamicCell value={text} field="text" data={record} row="email" />
        )
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        width: 150,
        render: (text, record) => (
          <DynamicCell value={text} field="text" data={record} row="contact" />
        )
      },
      {
        title: "Address",
        dataIndex: "location",
        key: "location",
        render: (text, record) => (
          <DynamicCell value={text} field="text" data={record} row="location" />
        )
      },
      {
        title: "Genre",
        dataIndex: "gender",
        key: "gender",
        render: (text, record) => (
          <DynamicCell
            value={text}
            field="select"
            select={[
              { id: "male", name: "Homme" },
              { id: "female", name: "Femme" }
            ]}
            data={record}
            row="gender"
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
        dataSource={this.props.clients}
      />
    );
  }
}

export default connect(({ clients }) => ({
  clients
}))(LocalTable);
