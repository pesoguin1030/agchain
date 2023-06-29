import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AlertModal = ({ A, B }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const close = () => {
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>警示</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {A && <p>錢包餘額不足</p>}
            {B && <p>授權碳權點數不足</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={close}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AlertModal;
