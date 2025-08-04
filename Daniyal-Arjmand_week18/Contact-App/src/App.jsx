import React, { useEffect } from "react";
import Home from "./Components/Home";
import { ContactService, useContacts } from "./context/Context";
import "./App.css";

const AppContent = () => {
  const { state } = useContacts();
  const { darkMode } = state;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

const App = () => {
  return (
    <ContactService>
      <AppContent />
    </ContactService>
  );
};

export default App;
