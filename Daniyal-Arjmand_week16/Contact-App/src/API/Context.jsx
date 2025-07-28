import React, { createContext, useReducer, useContext } from "react";
import { v4 } from "uuid";

const context = createContext();

const initialState = {
  contacts: [],
  view: "home", 
  formVisible: false,
  contactEdit: null,
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FORM":
      return {
        ...state,
        formVisible: !state.formVisible,
        contactEdit: !state.formVisible ? state.contactEdit : null, 
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
        contactEdit: action.payload === "home" ? null : state.contactEdit,
        formVisible: action.payload === "home" ? state.formVisible : false,
      };
    case "SAVE_CONTACT":
      const contact = action.payload;
      if (contact.id) {
        return {
          ...state,
          contacts: state.contacts.map((item) =>
            item.id === contact.id ? contact : item
          ),
          contactEdit: null,
          formVisible: false,
        };
      } else {

        return {
          ...state,
          contacts: [...state.contacts, { ...contact, id: v4() }],
          formVisible: false,
        };
      }
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.payload),
      };
    case "DELETE_MULTIPLE_CONTACTS":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => !action.payload.includes(contact.id)
        ),
      };
    case "START_EDIT":
      return {
        ...state,
        contactEdit: action.payload,
        view: "home",
        formVisible: true,
      };
    default:
      return state;
  }
};

export const ContactService = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(context);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactService");
  }
  return context;
};
