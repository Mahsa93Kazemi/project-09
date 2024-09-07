import React from "react";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm}>تایید</button>
      <button onClick={onCancel}>انصراف</button>
    </div>
  );
};

export default Modal;
