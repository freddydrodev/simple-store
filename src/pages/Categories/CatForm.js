import React, { Component } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { DB } from "../../configs/database";
import { updateCategory } from "../../actions";

const FormItem = Form.Item;

class CatForm extends Component {
  submit = () => {
    const { form } = this.props;

    form.validateFields((err, values) => {
      const { name } = values;
      if (!err) {
        DB.post({
          name: name.trim(),
          madeBy: this.props.currentUser.name,
          madeSince: new Date(),
          type: "category"
        }).then(() => {
          form.resetFields();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark>
        <FormItem label="Nom de la categorie" required>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez le nom de la categorie"
              }
            ]
          })(<Input onPressEnter={this.submit} />)}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

const FormElement = connect(
  mapStateToProps,
  { updateCategory }
)(Form.create()(CatForm));

export default FormElement;
