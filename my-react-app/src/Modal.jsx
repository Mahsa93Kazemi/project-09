import React, { useContext, useEffect } from "react";
import { ContactContext } from "./ContactContext";

const Modal = ({ actionType, contactId, message, onConfirm = () => {}, onCancel }) => {
  const { deleteContact, editContact } = useContext(ContactContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onCancel();
    }
  };

  const handleAction = () => {
    if (actionType === "delete") {
      deleteContact(contactId);
    } else if (actionType === "edit") {
      editContact(contactId);
    }

    onConfirm(); // Now safe to call because we provided a default function
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-confirm" onClick={handleAction}>
            تایید
          </button>
          <button className="modal-cancel" onClick={onCancel}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
