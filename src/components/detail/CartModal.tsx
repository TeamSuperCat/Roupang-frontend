import React from "react";

const CartModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default CartModal;
