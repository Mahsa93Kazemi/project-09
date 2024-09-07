import React from "react";

const ConfirmModal = ({ type, onConfirm, onCancel }) => {
  const messages = {
    add: "Do you want to add a new contact?",
    delete: "Are you sure you want to delete this contact?",
    bulkDelete: "Are you sure you want to delete the selected contacts?",
    edit: "Are you sure you want to edit this contact?",
  };

  return (
    <div className="modal">
      <p>{messages[type]}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmModal;
