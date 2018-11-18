import React, { Component } from "react";
import { Table, Button } from "antd";
import PropTypes from "prop-types";
import { DB } from "../../configs";

class DynamicTable extends Component {
  deleteDataHandler = r => {
    DB.rel.del(r._rowType, { ...r });
  };

  render() {
    const { columns, dataSource, hideOption } = this.props;
    const _col = !hideOption
      ? [
          ...columns,
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
                  onClick={() => this.deleteDataHandler(r)}
                />
              </span>
            )
          }
        ]
      : columns;

    return (
      <Table
        bordered
        locale={{ emptyText: "Aucune donnee" }}
        bodyStyle={{ backgroundColor: "white", borderRadius: 5, margin: 0 }}
        columns={_col}
        dataSource={dataSource}
        size="small"
      />
    );
  }
}

export default DynamicTable;

DynamicTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  hideOption: PropTypes.bool
};
