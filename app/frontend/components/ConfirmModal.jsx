import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Modal from 'components/Modal';

class ConfirmModal extends Component {
  handleConfirm = () => {
    const { onConfirm, toggle } = this.props;
    onConfirm();
    toggle();
  }

  render() {
    const { children, confirmButtonText, header, isOpen, toggle } = this.props;

    return (
      <Modal
        footer={
          <Button
            color="warning"
            type="submit"
            onClick={this.handleConfirm}
          >
            { confirmButtonText }
          </Button>
        }
        header={header}
        isOpen={isOpen}
        toggle={toggle}
      >
        { children }
      </Modal>
    );
  }
}

ConfirmModal.defaultProps = {
  children: null,
  confirmButtonText: 'Да',
  header: 'Вы уверены?',
  onConfirm: () => {},
  toggle: () => {},
};

ConfirmModal.propTypes = {
  children: PropTypes.node,
  confirmButtonText: PropTypes.string,
  header: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  toggle: PropTypes.func,
};

export default ConfirmModal;
