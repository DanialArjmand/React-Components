import React, { createContext, useReducer, useContext, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const PascalCase = createContext();

const initialState = {
  contacts: [],
  view: "home",
  formVisible: false,
  contactEdit: null,
  darkMode: false,
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT_SUCCESS":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT_SUCCESS":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        contactEdit: null,
      };
    case "DELETE_CONTACT_SUCCESS":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
      };
    case "DELETE_MULTIPLE_SUCCESS":
      return {
        ...state,
        contacts: state.contacts.filter((c) => !action.payload.includes(c.id)),
      };
    case "TOGGLE_FORM":
      return {
        ...state,
        formVisible: !state.formVisible,
        contactEdit: !state.formVisible ? state.contactEdit : null,
      };
    case "START_EDIT":
      return {
        ...state,
        contactEdit: action.payload,
        view: "home",
        formVisible: true,
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const ContactService = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch({ type: "SET_CONTACTS", payload: data });
    };
    fetchContacts();
  }, []);

  const saveContact = async (contact) => {
    try {
      if (contact.id) {
        const response = await fetch(`${API_URL}/${contact.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        const updatedContact = await response.json();
        dispatch({ type: "UPDATE_CONTACT_SUCCESS", payload: updatedContact });
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        const newContact = await response.json();
        dispatch({ type: "ADD_CONTACT_SUCCESS", payload: newContact });
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CONTACT_SUCCESS", payload: id });
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const deleteMultipleContacts = async (ids) => {
    try {
      await Promise.all(
        ids.map((id) => fetch(`${API_URL}/${id}`, { method: "DELETE" }))
      );
      dispatch({ type: "DELETE_MULTIPLE_SUCCESS", payload: ids });
    } catch (error) {
      console.error("Failed to delete multiple contacts:", error);
    }
  };

  return (
    <PascalCase.Provider
      value={{
        state,
        dispatch,
        saveContact,
        deleteContact,
        deleteMultipleContacts,
      }}
    >
      {children}
    </PascalCase.Provider>
  );
};

export const useContacts = () => {
  return useContext(PascalCase);
};
