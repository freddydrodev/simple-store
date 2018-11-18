import React, { Component } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import { DB } from "../../configs/database";

const FormItem = Form.Item;
const { Option } = Select;

class LocalForm extends Component {
  submit = () => {
    const { form } = this.props;

    form.validateFields((err, values) => {
      const { name, gender, email, contact, location } = values;
      if (!err) {
        DB.rel
          .save("clients", {
            name: name.trim(),
            email: email.trim(),
            contact: contact.trim(),
            location: location.trim(),
            gender,
            madeBy: this.props.currentUser.name,
            madeSince: new Date()
          })
          .then(() => {
            form.resetFields();
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark>
        <FormItem label="Nom du client" required>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez le nom du client"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="Email du client" required>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez l'email du client"
              },
              {
                type: "email",
                message: "Doit etre une addresse email valide"
              }
            ]
          })(<Input type="email" />)}
        </FormItem>
        <FormItem label="Contact du client" required>
          {getFieldDecorator("contact", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez le contact du client"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="Addresse du client" required>
          {getFieldDecorator("location", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez le Addresse du client"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="Genre" required>
          {getFieldDecorator("gender", {
            initialValue: "male"
          })(
            <Select>
              {[
                { id: "male", name: "Homme" },
                { id: "female", name: "Femme" }
              ].map(({ name, id }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

const FormElement = connect(mapStateToProps)(Form.create()(LocalForm));

export default FormElement;
