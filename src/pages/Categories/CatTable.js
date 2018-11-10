import React, { Component } from "react";
import { Table, Button, Input } from "antd";
import { connect } from "react-redux";
import { CATEGORIES_DB } from "../../configs/database/categories";
import { updateCategory } from "../../actions";
import moment from "moment";

class CatTable extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    console.log();
    const data = await CATEGORIES_DB.allDocs({ include_docs: true }).then(
      docs => {
        console.log(docs.rows);
        return docs.rows.map(({ doc }) => {
          const { _id, name, madeBy, madeSince } = doc;

          return { id: _id, key: _id, name, madeBy, madeSince };
        });
      }
    );

    console.log(data);

    this.setState({ data });
  }

  render() {
    return (
      <Table
        bordered
        locale={{ emptyText: "Aucune donnee" }}
        bodyStyle={{ backgroundColor: "white", borderRadius: 5, margin: 0 }}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text, record, id) => <Input value={id + 1} readOnly />
          },
          {
            title: "Nom",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
              <Input
                value={record.name}
                onChange={({ target }) =>
                  this.updateDataHandler(
                    target.value,
                    record.id,
                    record._rev,
                    "name"
                  )
                }
              />
            )
          },
          {
            title: "Cree par",
            dataIndex: "madeBy",
            key: "madeBy",
            render: text => <Input value={text} readOnly />
          },
          {
            title: "Cree depuis",
            dataIndex: "madeSince",
            key: "madeSince",
            render: text => <Input value={moment(text).fromNow()} readOnly />
          },
          {
            title: "Options",
            dataIndex: "options",
            key: "options",
            width: 80,
            align: "center",
            render: (a, r) => (
              <span className="p-1 block">
                <Button
                  size="small"
                  type="danger"
                  icon="delete"
                  title={r._rev}
                  style={{ fontSize: 14 }}
                  onClick={() => this.deleteDataHandler(r._id, r._rev)}
                />
              </span>
            )
          }
        ]}
        dataSource={this.props.categories}
        size="small"
      />
    );
  }

  deleteDataHandler = (_id, _rev) => {
    CATEGORIES_DB.remove({ _id, _rev }).then(() => {
      CATEGORIES_DB.allDocs({ include_docs: true }).then(docs => {
        const cat = docs.rows.map(({ doc }) => {
          const { _id, name, madeBy, madeSince } = doc;

          return { id: _id, key: _id, name, madeBy, madeSince, ...doc };
        });
        this.props.updateCategory(cat);
      });
    });
  };

  updateDataHandler = (data, id, rev, field) => {
    console.log(data, id, rev, field);
    CATEGORIES_DB.put({ _id: id, _rev: rev, [field]: data }).then(() => {
      CATEGORIES_DB.allDocs({ include_docs: true }).then(docs => {
        const cat = docs.rows.map(({ doc }) => {
          const { _id, name, madeBy, madeSince } = doc;

          return { id: _id, key: _id, name, madeBy, madeSince, ...doc };
        });
        this.props.updateCategory(cat);
      });
    });
  };
}

export default connect(
  ({ categories }) => ({ categories }),
  { updateCategory: updateCategory }
)(CatTable);
