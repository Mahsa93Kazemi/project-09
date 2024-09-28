import React, { createContext, useReducer, useContext } from "react";

// Creating a context for contacts
export const ContactContext = createContext();

const contactReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };

    case "UPDATE_CONTACT": // Update a contact
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case "DELETE_CONTACT": // Delete a contact
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    case "TOGGLE_CONTACT_SELECTION": // Toggle contact selection
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter((id) => id !== action.payload) // Deselect
          : [...state.selectedContacts, action.payload], // Select
      };

    default:
      return state; // Return the current state if action type is not recognized
  }
};

// ContactProvider component
export const ContactProvider = ({ children }) => {
  const initialState = {
    contacts: [], // List of contacts
    selectedContacts: [], // Selected contacts
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook for using contact context
export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};
