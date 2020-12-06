import React from "react";
import { Modal, Button } from "react-bootstrap";
const GiftCard = ({ children, onPressLike, onClose, visible, disabled }) => {
  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>電子賀卡</Modal.Title>
        <button
          className="btn btn-xs btn-icon btn-soft-secondary"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
            />
          </svg>
        </button>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          關閉
        </Button>
        {disabled ? (
          <Button variant="success" disabled>
            <i className="fas fa-check"></i> 已按過讚
          </Button>
        ) : (
          <Button
            variant="dark"
            style={{ backgroundColor: "var(--pink)" }}
            onClick={onPressLike}
          >
            <i className="fas fa-heart"></i> 喜歡
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GiftCard;
