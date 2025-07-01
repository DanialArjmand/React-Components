import React, { useState, useEffect } from "react";
import "./App.css";

const TabsComponent = () => {
  const tabs = [
    { id: 0, name: "TAB 1" },
    { id: 1, name: "TAB 2" },
    { id: 2, name: "TAB 3" },
    { id: 3, name: "TAB 4" },
  ];

  const contents = ["Content 1", "Content 2", "Content 3", "Content 4"];

  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a neque ut nunc euismod euismod.",
    "Curabitur vitae turpis ac sapien blandit tincidunt. Integer convallis purus sed augue pellentesque.",
    "Sed ac mauris quis eros efficitur accumsan. Donec finibus nisi at augue fringilla, vel consectetur.",
    "Quisque non urna nec libero faucibus hendrerit. Phasellus fermentum sapien et turpis bibendum.",
  ];

  const [activeTab, setActiveTab] = useState(
    parseInt(localStorage.getItem("activeTab")) || 0
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div class="tabs-container">
      <h1 class="tabs-title">Tabs Component with React</h1>

      <div class="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            class={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div class="tab-content">
        <h2>{contents[activeTab]}</h2>
        <p>{paragraphs[activeTab]}</p>
      </div>
    </div>
  );
};

export default TabsComponent;
