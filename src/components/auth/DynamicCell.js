import React, { Component } from "react";
import { Input, InputNumber, Select, DatePicker } from "antd";
import PropTypes from "prop-types";
import { DB } from "../../configs";

const { Option } = Select;
class DynamicCell extends Component {
  state = {
    value: null
  };

  updateDataHandler = () => {
    DB.put({
      ...this.props.data,
      [this.props.row]: this.state.value || this.props.value
    });
  };

  updateValue = value => {
    console.log(value);
    if (this.props.field === "number" && typeof value === "number") {
      this.setState({ value });
    }
    if (
      (this.props.field === "text" || this.props.field === "select") &&
      value.trim().length > 0
    ) {
      this.setState({ value });
    }

    // this.setState(value);
  };

  render() {
    const { field, value, data, row, select } = this.props;
    let inp = null;

    switch (field) {
      case "text":
        inp = (
          <Input
            value={this.state.value || value}
            onChange={({ target }) => this.updateValue(target.value)}
            onBlur={this.updateDataHandler}
          />
        );
        break;
      case "number":
        inp = (
          <InputNumber
            min={0}
            value={this.state.value || value}
            onChange={this.updateValue}
            onBlur={this.updateDataHandler}
          />
        );
        break;
      case "select":
        inp = (
          <Select
            value={this.state.value || value}
            onChange={this.updateValue}
            onBlur={this.updateDataHandler}
          >
            {select.map(({ name, _id }) => (
              <Option key={_id} value={name}>
                {name}
              </Option>
            ))}
          </Select>
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
  select: PropTypes.array,
  field: PropTypes.oneOf(["text", "number", "select", "date"])
};
