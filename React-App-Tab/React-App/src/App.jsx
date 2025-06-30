import React, { useState } from "react";
import "./App.css";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["TAB 1", "TAB 2", "TAB 3", "TAB 4"];
  const contents = [
    "Content 1",
    "Content 2",
    "Content 3",
    "Content 4"
  ];

  return (
    <div className="tabs-container">
      <h1 className="tabs-title">Tabs Component with React</h1>

      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="tab-content">
        <h2>{contents[activeTab]}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
          Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
          In sodales pretium ultricies. Maecenas lectus est, sollicitudin consectetur felis nec,
          feugiat ultrices mi.
        </p>
      </div>
    </div>
  );
}
