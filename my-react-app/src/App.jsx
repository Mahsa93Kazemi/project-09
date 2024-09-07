import React, { useState, useCallback, useEffect } from "react";
import ContactList from "./ContactList";
import AddContactForm from "./AddContactForm";
import EditContactForm from "./EditContactForm";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import BulkActions from "./BulkActions";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddContact = useCallback((contact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: Date.now(), ...contact },
    ]);
  }, []);

  const handleEditContact = useCallback((contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === contact.id ? contact : c))
    );
    setIsEditing(false);
    setSelectedContact(null);
    setSuccessMessage("تغییرات اعمال گردید");
  }, []);

  const handleDeleteContact = useCallback((id) => {
    setModalMessage("آیا مطمئن هستید که میخواهید این مخاطب را حذف کنید؟");
    setShowModal(true);
    setOnConfirm(() => () => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
      setShowModal(false);
      setSuccessMessage("مخاطب با موفقیت حذف گردید");
    });
  }, []);

  const handleBulkDelete = useCallback((ids) => {
    setModalMessage("آیا از حذف مخاطبان مطمئن هستید؟");
    setShowModal(true);
    setOnConfirm(() => () => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => !ids.includes(contact.id))
      );
      setSelectedContacts([]);
      setShowModal(false);
      setSuccessMessage("مخاطبین با موفقیت حذف گردیدند");
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.includes(searchQuery) || contact.email.includes(searchQuery)
  );

  return (
    <div className="App">
      <SearchBar onSearch={setSearchQuery} />
      <ContactList
        contacts={filteredContacts}
        selectedContacts={selectedContacts}
        onSelectContact={(id) =>
          setSelectedContacts((prevSelected) =>
            prevSelected.includes(id)
              ? prevSelected.filter((selectedId) => selectedId !== id)
              : [...prevSelected, id]
          )
        }
        onDelete={handleDeleteContact}
        onEdit={(contact) => {
          setSelectedContact(contact);
          setIsEditing(true);
        }}
      />
      <BulkActions
        selectedContacts={selectedContacts}
        onDelete={handleBulkDelete}
        onClearSelection={() => setSelectedContacts([])}
      />
      {isEditing ? (
        <EditContactForm contact={selectedContact} onSave={handleEditContact} />
      ) : (
        <AddContactForm onAdd={handleAddContact} />
      )}
      {showModal && (
        <Modal
          message={modalMessage}
          onConfirm={onConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
      {successMessage && (
        <div className="message-box success">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;
