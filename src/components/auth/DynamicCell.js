import React, { Component } from "react";
import { Input, InputNumber, Select, DatePicker } from "antd";
import PropTypes from "prop-types";
import { DB } from "../../configs";

class DynamicCell extends Component {
  state = {
    value: null
  };

  updateDataHandler = (data, row) => {
    DB.put({ ...data, [row]: this.state.value || this.props.value });
  };

  updateValue = ({ target }) => {
    const { value } = target;
    this.setState({ value });
  };

  render() {
    const { field, value, data, row } = this.props;
    let inp = null;

    switch (field) {
      case "text":
        inp = (
          <Input
            value={this.state.value || value}
            onChange={this.updateValue}
            onBlur={() => this.updateDataHandler(data, row)}
          />
        );
        break;

      default:
        inp = <Input value={value} readOnly />;
        break;
    }

    return inp;
  }
}

export default DynamicCell;

DynamicCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.object.isRequired,
  row: PropTypes.string.isRequired,
  field: PropTypes.oneOf(["text", "number", "select", "date"])
};
