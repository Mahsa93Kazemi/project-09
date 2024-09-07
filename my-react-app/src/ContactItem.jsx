import React from "react";

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <div>
      <span>{contact.name}</span>
      <span>{contact.email}</span>
      <span>{contact.phone}</span>
      <span>{contact.job}</span>
      <button class="editeBtn" onClick={() => onEdit(contact)}>ویرایش</button>
      <button class="deleteBtn" onClick={() => onDelete(contact.id)}>حذف</button>
    </div>
  );
};

export default ContactItem;
