import React, { useState } from "react";
import Modal from "./Modal";

function ContactItem({ contact, onSelect, onDelete, onEdit, isSelected }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleSelect = () => {
    if (onSelect) {
      onSelect(contact.id);
    } else {
      console.error("onSelect is not a function");
    }
  };
  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(contact.id);
    } else {
      console.error("onDelete is not a function");
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEdit = () => {
    setEditedContact(contact);
    setShowEditConfirmation(true);
  };

  const confirmEdit = () => {
    setShowEditForm(true);
    setShowEditConfirmation(false);
  };

  const cancelEdit = () => {
    setShowEditConfirmation(false);
  };

  const saveEdit = () => {
    if (onEdit) {
      onEdit(editedContact);
    } else {
      console.error("onEdit is not a function");
    }
    setShowEditForm(false);
  };

  return (
    <div className={`contact-item ${isSelected ? "selected" : ""}`}>
      <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      <span>{contact.name}</span>
      <span>{contact.email}</span>
      <span>{contact.phone}</span>
      <span>{contact.job}</span>
      <button onClick={handleEdit}>ویرایش</button>
      <button onClick={handleDelete}>حذف</button>

      {showDeleteConfirmation && (
        <Modal onClose={cancelDelete}>
          <p>آیا میخواهی مخاطب مورد نظر حذف گردد؟</p>
          <button onClick={confirmDelete}>تایید</button>
          <button onClick={cancelDelete}>انصراف</button>
        </Modal>
      )}

      {showEditConfirmation && (
        <Modal onClose={cancelEdit}>
          <p>آیا میخواهی مخاطب مورد نظر را ویرایش کنی؟</p>
          <button onClick={confirmEdit}>تایید</button>
          <button onClick={cancelEdit}>انصراف</button>
        </Modal>
      )}

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <div className="edit-form">
            <h3>ویرایش مخاطب</h3>
            <input
              type="text"
              value={editedContact.name}
              onChange={(e) =>
                setEditedContact({ ...editedContact, name: e.target.value })
              }
              placeholder="نام"
            />
            <input
              type="email"
              value={editedContact.email}
              onChange={(e) =>
                setEditedContact({ ...editedContact, email: e.target.value })
              }
              placeholder="ایمیل"
            />
            <input
              type="tel"
              value={editedContact.phone}
              onChange={(e) =>
                setEditedContact({ ...editedContact, phone: e.target.value })
              }
              placeholder="شماره تلفن"
            />
            <input
              type="text"
              value={editedContact.job}
              onChange={(e) =>
                setEditedContact({ ...editedContact, job: e.target.value })
              }
              placeholder="شغل"
            />
            <button onClick={saveEdit}>ذخیره</button>
            <button onClick={() => setShowEditForm(false)}>لغو</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ContactItem;
