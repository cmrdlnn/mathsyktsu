import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal as ReactstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const Modal = ({
  bodyClass,
  children,
  closeButtonColor,
  footer,
  footerClass,
  header,
  headerClass,
  isOpen,
  toggle,
  wrapper: Wrapper,
  ...modalProps
}) => (
  <ReactstrapModal
    {...modalProps}
    isOpen={isOpen}
    toggle={toggle}
  >
    <Wrapper>
      <ModalHeader className={headerClass} toggle={toggle}>
        { header }
      </ModalHeader>
      <ModalBody className={bodyClass}>
        { children }
      </ModalBody>
      <ModalFooter className={footerClass}>
        { footer }
        <Button color={closeButtonColor} onClick={toggle}>
          Закрыть
        </Button>
      </ModalFooter>
    </Wrapper>
  </ReactstrapModal>
);

Modal.defaultProps = {
  bodyClass: 'login-modal',
  children: null,
  closeButtonColor: 'warning',
  footer: null,
  footerClass: 'login-modal-wrapper',
  header: null,
  headerClass: 'login-modal-wrapper',
  toggle: () => {},
  wrapper: Fragment,
};

Modal.propTypes = {
  bodyClass: PropTypes.string,
  children: PropTypes.node,
  closeButtonColor: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  footerClass: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  headerClass: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func,
  wrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.symbol,
  ]),
};

export default Modal;
