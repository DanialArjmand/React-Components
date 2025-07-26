import React, { useState } from "react";
import "./Home.css";
import Inputs from "./Inputs";
import ContactList from "./ContactList";
import { v4 } from "uuid";

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
            <button className="text-butt" onClick={toggleForm}>
              افزودن +
            </button>
            <button className="text-butt" onClick={showListPage}>
              لیست مخاطبین
            </button>
            <button className="text-butt"> حالت تاریک</button>
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
