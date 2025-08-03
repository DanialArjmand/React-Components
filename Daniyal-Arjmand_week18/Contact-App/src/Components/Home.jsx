import "./Home.css";
import Inputs from "./Inputs";
import ContactList from "./ContactList";
import { v4 } from "uuid";
import { useContacts } from "../API/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faUserPlus,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import "./DarkMode.css";
// import CountUp from "react-countup";
import logoWhite from "../images/logo-white.png";
import logoDark from "../images/logo-dark.png";

const Home = () => {
  const { state, dispatch } = useContacts();
  const { view, formVisible, darkMode, contacts } = state;

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
              <div className="header">
                <div className="button-container">
                  <button className="text-butt-user" onClick={toggleForm}>
                    <span className="label-butt"> افزودن </span>
                    <FontAwesomeIcon icon={faUserPlus} className="icon-user" />
                  </button>

                  <button className="text-butt-list" onClick={showListPage}>
                    <span className="label-butt"> لیست مخاطبین </span>
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className="icon-list"
                    />
                  </button>

                  <button
                    className="text-butt-mode"
                    onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
                  >
                    <span className="label-butt">
                      {darkMode ? "حالت روز" : "حالت شب"}
                    </span>
                    <FontAwesomeIcon
                      icon={faCircleHalfStroke}
                      className="icon-light"
                    />
                  </button>
                </div>

                <img
                  src={darkMode ? logoWhite : logoDark}
                  alt="Logo DA"
                  style={{ width: "65px", height: "auto", margin: "0 10px" }}
                />
              </div>
              <div className="text-content">
                <h1>
                  مدیریت هوشمند
                  <span> مخاطبین</span>
                </h1>
                <p>
                  این برنامه به شما کمک می‌کند تا لیستی کامل از مخاطبین خود
                  بسازید. برای هر شخص اطلاعاتی مانند نام، شماره تلفن، ایمیل،
                  دسته‌بندی (دوست، همکار، ...) و جنسیت را ثبت کرده و به سرعت به
                  آنها دسترسی پیدا کنید.
                </p>
                <div className="number-contacts">
                  <p>تعداد مخاطبین ذخیره شده:</p>
                  <span>
                    {contacts.length}
                    {/* <CountUp
                      key={contacts.length}
                      start={0}
                      end={contacts.length}
                      duration={2.5}
                    /> */}
                  </span>
                </div>
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
