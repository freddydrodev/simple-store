import React, { Component } from "react";
import { Form, Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import { CATEGORIES_DB } from "../../configs/database/categories";
import { updateCategory } from "../../actions";

const FormItem = Form.Item;
class CatForm extends Component {
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
          })(<Input onPressEnter={this.props.save} />)}
        </FormItem>
      </Form>
    );
  }
}

const FormElement = Form.create()(CatForm);

class AddCategory extends Component {
  state = {
    visible: false
  };

  modalShow = () => {
    this.setState({ visible: true });
  };

  modalHide = () => {
    this.setState({ visible: false });
  };

  save = () => {
    const { form } = this.wrappedForm.props;

    form.validateFields((err, values) => {
      const { name } = values;
      if (!err) {
        CATEGORIES_DB.post({
          name: name.trim(),
          madeBy: this.props.currentUser.name,
          madeSince: new Date()
        }).then(() => {
          CATEGORIES_DB.allDocs({ include_docs: true }).then(docs => {
            const cat = docs.rows.map(({ doc }) => {
              const { _id, name, madeBy, madeSince } = doc;

              return { id: _id, key: _id, name, madeBy, madeSince, ...doc };
            });
            console.log(cat, this.props.updateCategory);
            this.props.updateCategory(cat);
            form.resetFields();
            this.setState({ visible: false });
          });
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button icon="plus" type="primary" onClick={this.modalShow} />
        <Modal
          visible={this.state.visible}
          onCancel={this.modalHide}
          onOk={this.save}
          title="Ajouter Categorie"
        >
          <FormElement
            save={this.save}
            wrappedComponentRef={wrappedform =>
              (this.wrappedForm = wrappedform)
            }
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

export default connect(
  mapStateToProps,
  { updateCategory }
)(AddCategory);
