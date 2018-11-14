import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";

class PageHeader extends Component {
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
    this.wrappedForm.submit();
  };

  render() {
    const { title, FormElement } = this.props;
    return (
      <div className="flex between middle py-3">
        <h2 className="page-legend">{title}</h2>
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
      </div>
    );
  }
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.bool,
  FormElement: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.func.isRequired
  ])
  // postDataHandler: PropTypes.func.isRequired
};
