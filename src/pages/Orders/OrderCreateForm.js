import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Form, Select, Button } from "antd";
import { DB } from "../../configs/database";
import generateID from "../../tools/generateID";
import { selectOrder } from "../../actions";

const FormItem = Form.Item;

const ArticleModalForm = connect(({ clients }) => ({ clients }))(
  Form.create()(
    class extends Component {
      render() {
        const { form, hide, ok, visible, clients } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            onCancel={hide}
            onOk={ok}
            visible={visible}
            title="Creer une commande"
          >
            <Form hideRequiredMark>
              <FormItem label="Selectionnez un client">
                {getFieldDecorator("client", {
                  rules: [{ required: true, message: "Ce champ est requis" }]
                })(
                  <Select showSearch>
                    {clients.clients &&
                      clients.clients.map(client => (
                        <Select.Option key={client.id} value={client.id}>
                          {client.name} / {client.contact}
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

class OrderCreateForm extends Component {
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
        const ref = generateID(5, "upper_num");
        const { client } = values;
        DB.rel.find("clients", client).then(clients => {
          DB.rel
            .save("orders", {
              id: ref,
              total: 0,
              client: clients.clients[0].id,
              products: [],
              createdAt: new Date(),
              createdBy: this.props.currentUser.name
            })
            .then(data => {
              this.props.selectOrder(data.orders[0]);
            });
        });

        this.hide();
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          icon="plus"
          shape="circle-outline"
          type="primary"
          className="mr-2"
          onClick={this.show}
        />
        <ArticleModalForm
          wrappedComponentRef={wrapedForm => (this.wrapedForm = wrapedForm)}
          visible={this.state.visible}
          hide={this.hide}
          ok={this.ok}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser }),
  { selectOrder }
)(OrderCreateForm);
