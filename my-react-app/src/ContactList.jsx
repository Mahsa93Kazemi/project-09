import React, { useEffect, useState } from "react";
import { useContact } from "./ContactContext";
import ContactItem from "./ContactItem";
import SearchBar from "./SearchBar";
import Modal from "./Modal";

function ContactList() {
  const { state, dispatch } = useContact();
  const { contacts } = state;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5173/contacts");
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();

        data.forEach((contact) => {
          if (
            !contacts.some(
              (existingContact) => existingContact.id === contact.id
            )
          ) {
            dispatch({ type: "ADD_CONTACT", payload: contact });
          }
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [dispatch, contacts]);

  const handleDelete = (id) => {
    setDeleteContactId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (deleteContactId) {
      await deleteContact(deleteContactId);
      dispatch({ type: "DELETE_CONTACT", payload: deleteContactId });
      setShowDeleteConfirmation(false);
      setDeleteContactId(null);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`http://localhost:5173/contacts/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (contact) => {
    setContactToEdit(contact);
  };

  const saveEdit = async () => {
    if (contactToEdit) {
      try {
        const response = await fetch(
          `http://localhost:5173/contacts/${contactToEdit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactToEdit),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update contact");
        }

        dispatch({ type: "UPDATE_CONTACT", payload: contactToEdit });
        setContactToEdit(null); // Close the modal after saving
      } catch (error) {
        console.error("Error editing contact:", error);
      }
    }
  };

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-list">
      <SearchBar onSearch={setSearchTerm} />

      {filteredContacts.map((contact) => (
        <ContactItem
          key={contact.id || contact.email}
          contact={contact}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <Modal onClose={() => setShowDeleteConfirmation(false)}>
          <p className="text">آیا می‌خواهید مخاطب را حذف کنید؟</p>
          <button onClick={confirmDelete}>تایید</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>
            انصراف
          </button>
        </Modal>
      )}

      {/* Edit Modal */}
      {contactToEdit && (
        <Modal onClose={() => setContactToEdit(null)}>
          <div className="edit-form">
            <h3>ویرایش مخاطب</h3>
            <input
              type="text"
              value={contactToEdit.name}
              onChange={(e) =>
                setContactToEdit({ ...contactToEdit, name: e.target.value })
              }
              placeholder="نام"
              required
            />
            <input
              type="email"
              value={contactToEdit.email}
              onChange={(e) =>
                setContactToEdit({ ...contactToEdit, email: e.target.value })
              }
              placeholder="ایمیل"
              required
            />
            <input
              type="tel"
              value={contactToEdit.phone}
              onChange={(e) =>
                setContactToEdit({ ...contactToEdit, phone: e.target.value })
              }
              placeholder="شماره تلفن"
              required
              pattern="[0-9]{11}"
            />
            <input
              type="text"
              value={contactToEdit.job}
              onChange={(e) =>
                setContactToEdit({ ...contactToEdit, job: e.target.value })
              }
              placeholder="شغل"
              required
            />
            <button onClick={saveEdit}>ذخیره</button>
            <button onClick={() => setContactToEdit(null)}>لغو</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ContactList;
