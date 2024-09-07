import React from "react";
import "./style.css"; // Importing CSS file for styling

const ContactList = ({
  contacts,
  selectedContacts,
  onSelectContact,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    onSelectAll(checked);
  };

  return (
    <div className="contact-list">
      <div className="header">
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={
            contacts.length > 0 && selectedContacts.length === contacts.length
          }
        />
        <span>انتخاب همه</span>
      </div>
      <div className="contact-items">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => onSelectContact(contact.id)}
            />
            <div className="contact-details">
              <span className="contact-name">{contact.name}</span>
              <span className="contact-email">{contact.email}</span>
              <span className="contact-phone">{contact.phone}</span>
              <span className="contact-job">{contact.job}</span>
            </div>
            <div className="contact-actions">
              <button class="editeBtn" onClick={() => onEdit(contact)}>
                ویرایش
              </button>
              <button class="deleteBtn" onClick={() => onDelete(contact.id)}>
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
