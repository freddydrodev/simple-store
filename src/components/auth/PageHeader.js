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
    const { title, FormElement, hideModal, titleStyle } = this.props;
    const style = titleStyle || {};
    return (
      <div className="flex between middle py-3">
        <h2 className="page-legend" style={style}>
          {title}
        </h2>
        {!hideModal && (
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
        )}
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
