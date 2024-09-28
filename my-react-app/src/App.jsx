import React, { useCallback, useEffect } from "react";
import ContactList from "./ContactList";
import AddContactForm from "./AddContactForm";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import BulkActions from "./BulkActions";
import { ContactProvider, useContact } from "./ContactContext";

const App = () => {
  const {
    state: { contacts, selectedContacts, successMessage },
    dispatch,
  } = useContact();

  const [selectedContact, setSelectedContact] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [onConfirm, setOnConfirm] = React.useState(() => () => {});
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleAddContact = useCallback(
    (contact) => {
      dispatch({
        type: "ADD_CONTACT",
        payload: { id: Date.now(), ...contact },
      });
    },
    [dispatch]
  );

  const handleEditContact = useCallback(
    (contact) => {
      dispatch({ type: "EDIT_CONTACT", payload: contact });
      setIsEditing(false);
      setSelectedContact(null);
    },
    [dispatch]
  );

  const handleDeleteContact = useCallback(
    (id) => {
      setModalMessage("آیا مطمئن هستید که میخواهید این مخاطب را حذف کنید؟");
      setShowModal(true);
      setOnConfirm(() => () => {
        dispatch({ type: "DELETE_CONTACT", payload: id });
        setShowModal(false);
      });
    },
    [dispatch]
  );

  const handleBulkDelete = useCallback(
    (ids) => {
      setModalMessage("آیا از حذف مخاطبان مطمئن هستید؟");
      setShowModal(true);
      setOnConfirm(() => () => {
        dispatch({ type: "BULK_DELETE_CONTACTS", payload: ids });
        setShowModal(false);
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_SUCCESS_MESSAGE" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.includes(searchQuery) || contact.email.includes(searchQuery)
  );

  return (
    <div className="App">
      <ContactList
        contacts={filteredContacts}
        selectedContacts={selectedContacts}
        onSelectContact={(id) => {
          dispatch({ type: "TOGGLE_SELECT_CONTACT", payload: id });
        }}
        onDelete={handleDeleteContact}
        onEdit={(contact) => {
          setSelectedContact(contact);
          setIsEditing(true);
        }}
      />
      <BulkActions
        selectedContacts={selectedContacts}
        onDelete={handleBulkDelete}
        onClearSelection={() => dispatch({ type: "CLEAR_SELECTED_CONTACTS" })}
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

const WrappedApp = () => (
  <ContactProvider>
    <App />
  </ContactProvider>
);

export default WrappedApp;
