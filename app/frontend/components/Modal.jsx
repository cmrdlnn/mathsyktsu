import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const CustomModal = ({
  children,
  className,
  closeButtonColor,
  footer,
  footerClass,
  header,
  headerClass,
  isOpen,
  style,
  toggle,
  wrapper: Wrapper,
  ...modalProps
}) => (
  <Modal
    className={className}
    isOpen={isOpen}
    style={style}
    toggle={toggle}
    {...modalProps}
  >
    <Wrapper>
      <ModalHeader className={headerClass} toggle={toggle}>
        { header }
      </ModalHeader>
      <ModalBody className={className}>
        { children }
      </ModalBody>
      <ModalFooter className={footerClass}>
        { footer }
        <Button color={closeButtonColor} onClick={toggle}>
          Закрыть
        </Button>
      </ModalFooter>
    </Wrapper>
  </Modal>
);

CustomModal.defaultProps = {
  className: 'login-modal',
  closeButtonColor: 'warning',
  footer: null,
  footerClass: 'login-modal-wrapper',
  headerClass: 'login-modal-wrapper',
  style: null,
  wrapper: Fragment,
};

CustomModal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeButtonColor: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  footerClass: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  headerClass: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  style: PropTypes.objectOf(
    PropTypes.string,
  ),
  toggle: PropTypes.func.isRequired,
  wrapper: PropTypes.node,
};

export default CustomModal;
