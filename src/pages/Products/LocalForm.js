import React, { Component } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import { DB } from "../../configs/database";
import { updateCategory, updateProducts } from "../../actions";
import generateID from "../../tools/generateID";

const FormItem = Form.Item;
const { Option } = Select;

class LocalForm extends Component {
  submit = () => {
    const { form } = this.props;

    form.validateFields((err, values) => {
      const { name, category, price, quantity } = values;
      console.log(values);
      const ref = generateID(5, "upper_num");
      if (!err) {
        DB.put({
          _id: ref,
          image: name.trim(),
          name: name.trim(),
          category: category ? category : "Aucune categorie",
          price: price,
          quantity: quantity,
          madeBy: this.props.currentUser.name,
          madeSince: new Date(),
          type: "product"
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
        <FormItem label="Nom du produit" required>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Entrez le nom du produit"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="Categorie du produit" required>
          {getFieldDecorator("category")(
            <Select>
              {this.props.categories.map(({ name, _id }) => (
                <Option key={_id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Prix du produit" required>
          {getFieldDecorator("price", {
            rules: [
              {
                required: true,
                message: "Entrez le prix du produit"
              },
              {
                type: "number",
                message: "Doit etre un nombre superieur a 0",
                min: 1
              }
            ]
          })(<InputNumber min={1} className="w-100" />)}
        </FormItem>
        <FormItem label="Quantite du produit" required>
          {getFieldDecorator("quantity", {
            rules: [
              {
                required: true,
                message: "Entrez la quantite du produit"
              },
              {
                type: "number",
                message: "Doit etre un nombre superieur a 0",
                min: 1
              }
            ]
          })(<InputNumber min={1} className="w-100" />)}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ currentUser, categories }) => ({
  currentUser,
  categories
});

const FormElement = connect(mapStateToProps)(Form.create()(LocalForm));

export default FormElement;