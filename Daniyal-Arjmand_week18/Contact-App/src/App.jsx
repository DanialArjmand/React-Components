import React from "react";
import Home from "./Components/Home";
import { ContactService } from "./API/Context";
import "./App.css";

const App = () => {
  return (
    <ContactService>
      <div className="App">
        <Home />
      </div>
    </ContactService>
  );
};

export default App;
