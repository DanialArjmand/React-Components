import React, { useState } from "react";
import "./Home.css";
import Inputs from "./Inputs";
import ContactList from "./ContactList";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faUserPlus,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState("home");
  const [formVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const showListPage = () => {
    setView("list");
  };

  const showHomePage = () => {
    setView("home");
  };

  const addContactHandler = (contact) => {
    const contactWithId = {
      ...contact,
      id: v4(),
    };
    setContacts((prevContacts) => [...prevContacts, contactWithId]);
  };

  return (
    <div className={`home-root ${formVisible ? "visible" : ""}`}>
      {view === "home" ? (
        <>
          <div className="art-container">
            <Inputs onSave={addContactHandler} onClose={toggleForm} />
          </div>
          <div className="glass-overlay"></div>

          <div className="text-container">
            <div className="button-container">
              <button className="text-butt-user" onClick={toggleForm}>
                <span className="label-butt"> افزودن </span>
                <FontAwesomeIcon icon={faUserPlus} className="icon-user" />
              </button>

              <button className="text-butt-list" onClick={showListPage}>
                <span className="label-butt"> لیست مخاطبین </span>
                <FontAwesomeIcon icon={faAddressBook} className="icon-list" />
              </button>

              <button className="text-butt-mode">
                <span className="label-butt"> حالت شب</span>
                <FontAwesomeIcon icon={faMoon} className="icon-moon" />
              </button>
            </div>
            <div className="text-content">
              <h1>
                برنامه مخاطبین برای ثبت شماره و ایمیل های
                <span> تحت وب</span>
              </h1>
              <p>
                شما میتوانید با دکمه افزودن لیستی از مخاطبین را ثبت کنید و در هر
                فیلد اسم ، شماره تلفن ، ایمیل ، دسته بندی و جنسیت رو داشته باشید
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="contact-list-page">
          <ContactList contacts={contacts} onBack={showHomePage} />
        </div>
      )}
    </div>
  );
}

export default Home;
