import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Form, Select, Button, Avatar } from "antd";

const FormItem = Form.Item;

const ArticleModalForm = connect(({ products }) => ({ products }))(
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
                    {this.props.products.map(prod => (
                      <Select.Option key={prod.id} value={prod.id}>
                        <Avatar size="small">F</Avatar>
                        <span className="pl-2">{prod.name}</span>
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
      if (!err) {
        console.log(values.product);
        this.hide();
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

export default OrderAddArticleBtn;
