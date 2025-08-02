import React, { useState, useEffect } from "react";
import "./Home.css";
import Inputs from "./Inputs";
import ContactList from "./ContactList";
import { v4 } from "uuid";
import { useContacts } from "../API/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faUserPlus,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import "./DarkMode.css";

const Home = () => {
  const { state, dispatch } = useContacts();
  const { view, formVisible, contacts, contactEdit } = state;
  // const [DarkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (DarkMode) {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }

  //   return () => {
  //     document.body.classList.remove("dark-mode");
  //   };
  // }, [DarkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode(!DarkMode);
  // };

  const toggleForm = () => {
    dispatch({ type: "TOGGLE_FORM" });
  };

  const showListPage = () => {
    dispatch({ type: "SET_VIEW", payload: "list" });
  };

  return (
    <div className="home-wrapper">
      <div className={`home-root ${formVisible ? "visible" : ""}`}>
        {view === "home" ? (
          <>
            <div className="art-container">
              <Inputs />
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

                <button
                  className="text-butt-mode"
                  onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
                >
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
                  شما میتوانید با دکمه افزودن لیستی از مخاطبین را ثبت کنید و در
                  هر فیلد اسم ، شماره تلفن ، ایمیل ، دسته بندی و جنسیت رو داشته
                  باشید
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="contact-list-page">
            <ContactList />
          </div>
        )}
      </div>
      <p className="footer-text">Developed by Daniyal.A | Botostart </p>
    </div>
  );
};

export default Home;
