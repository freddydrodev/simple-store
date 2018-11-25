import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Form, Select, Button } from "antd";
import { DB } from "../../configs";
import { selectOrder } from "../../actions";

const FormItem = Form.Item;

const ArticleModalForm = connect(({ products, selectedOrder }) => ({
  products,
  selectedOrder
}))(
  Form.create()(
    class extends Component {
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Modal
            onCancel={this.props.hide}
            onOk={this.props.ok}
            visible={this.props.visible}
            title="Ajouter un acticle"
          >
            <Form hideRequiredMark>
              <FormItem label="Article">
                {getFieldDecorator("product", {
                  rules: [{ required: true, message: "Ce champ est requis" }]
                })(
                  <Select showSearch>
                    {this.props.products.products
                      //check if the product is not already in this order
                      .filter(prod => {
                        return (
                          this.props.selectedOrder.products.indexOf(prod.id) ===
                            -1 && prod.quantity > 0
                        );
                      })
                      //display the select option
                      .map(prod => (
                        <Select.Option key={prod.id} value={prod.id}>
                          {/* <Avatar size="small">F</Avatar> */}
                          <span className="pl-2">
                            {prod.name} - {prod.price} ({prod.quantity}{" "}
                            Disponible(s))
                          </span>
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  )
);

class OrderAddArticleBtn extends Component {
  state = {
    visible: false
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  ok = () => {
    this.wrapedForm.props.form.validateFields((err, values) => {
      const selectedOrder = this.props.selectedOrder;
      const { product } = values;
      if (!err) {
        if (selectedOrder.products.indexOf(product) === -1) {
          selectedOrder.products.push(product);
          selectedOrder[product] = 0;
          DB.rel
            .save("orders", selectedOrder)
            .then(({ orders }) => this.props.selectOrder(orders[0]))
            .catch(err => err);
        }
      }
    });
  };

  render() {
    return (
      <div className="p-2 w-100 flex">
        <Button icon="plus" block type="dashed" onClick={this.show} />
        <ArticleModalForm
          wrappedComponentRef={wrapedForm => (this.wrapedForm = wrapedForm)}
          visible={this.state.visible}
          hide={this.hide}
          ok={this.ok}
        />
      </div>
    );
  }
}

export default connect(
  ({ selectedOrder }) => ({ selectedOrder }),
  { selectOrder }
)(OrderAddArticleBtn);
