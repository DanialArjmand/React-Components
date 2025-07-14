import { useState, useEffect, useRef } from "react";
import Input from "./input.jsx";
import data from "./cities.json";

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ghost, setGhost] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);

  const handleChange = (event) => {
    const valid = event.target.value.toLowerCase();
    setValue(valid);
    setActiveIndex(-1);

    if (valid === "") {
      setSuggestions([]);
      setGhost("");
      return;
    }
    const matches = data.filter((item) => item.toLowerCase().startsWith(valid));
    setSuggestions(matches);
  };

  const handleSuggestionClick = (city) => {
    setValue(city);
    setSuggestions([]);
    setGhost("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex !== -1) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else if (ghost && value !== ghost) {
        handleSuggestionClick(ghost);
      }
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      setGhost(suggestions[activeIndex]);
    } else if (suggestions.length > 0) {
      setGhost(suggestions[0]);
    } else {
      setGhost(value);
    }

    if (listRef.current && activeIndex >= 0) {
      const activeItem = listRef.current.children[activeIndex];
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, suggestions, value]);

  return (
    <div className="container">
      <Input
        value={value}
        handleChange={handleChange}
        ghost={ghost}
        handleKeyDown={handleKeyDown}
      />

      {suggestions.length > 0 && (
        <ul ref={listRef} className="suggestion-list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={`suggestion-item ${
                index === activeIndex ? "is-active" : ""
              }`}
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
