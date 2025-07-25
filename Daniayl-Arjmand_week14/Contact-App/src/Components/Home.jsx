import React, { useState } from "react";
import "./Home.css";
import Inputs from "./Inputs";
import ContactList from "./ContactList";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState("home");

  const showListPage = () => {
    setView("list");
  };

  const showHomePage = () => {
    setView("home");
  };

  const addContactHandler = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  return (
    <div className="home-root">
      {view === "home" ? (
        <>
          <div className="art-container">
            <Inputs onSave={addContactHandler} />
          </div>

          <div>
            <div className="text-container">
              <button className="text-butt"> افزودن +</button>
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
                  شما میتوانید با دکمه افزودن لیستی از مخاطبین را ثبت کنید و در
                  هر فیلد اسم ، شماره تلفن ، ایمیل ، دسته بندی و جنسیت رو داشته
                  باشید
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="contact-list-page">
          <ContactList contacts={contacts} />
          <button
            className="text-butt"
            style={{ marginTop: "20px" }}
            onClick={showHomePage}
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
