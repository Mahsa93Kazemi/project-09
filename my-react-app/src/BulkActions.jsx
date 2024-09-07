import React, { useState, useEffect, useCallback } from "react";

const BulkActions = ({ selectedContacts, onDelete, onClearSelection }) => {
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = useCallback(() => {
    if (selectedContacts.length > 1) {
      setShowConfirmation(true);
    }
  }, [selectedContacts.length]);

  const confirmDelete = useCallback(() => {
    onDelete(selectedContacts);
    setMessage("مخاطبین با موفقیت از لیست حذف گردیدند");
    onClearSelection();
    setShowConfirmation(false);
  }, [onDelete, onClearSelection, selectedContacts]);

  const cancelDelete = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      {selectedContacts.length > 1 && (
        <button onClick={handleDelete}>حذف گروهی</button>
      )}

      {showConfirmation && (
        <div className="confirmation-box">
          <p>آیا از حذف مخاطبین اطمینان دارید؟</p>
          <button onClick={confirmDelete}>بله</button>
          <button onClick={cancelDelete}>خیر</button>
        </div>
      )}

      {message && (
        <div className="message-box success">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
