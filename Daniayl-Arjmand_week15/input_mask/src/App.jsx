import { useState } from "react";
import Input from "./input.jsx";
import data from "./cities.json";

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ghost, setGhost] = useState("");

  const handleChange = (event) => {
    const valid = event.target.value.toLowerCase();
    setValue(valid);

    if (valid === "") {
      setSuggestions([]);
      setGhost("");
      return;
    }

    const matches = data.filter((item) => item.toLowerCase().startsWith(valid));

    setSuggestions(matches);

    if (matches.length > 0) {
      setGhost(matches[0]);
    } else {
      setGhost(valid);
    }
    console.log("Matches:", matches);
    console.log("Suggestions:", suggestions);
  };

  return (
    <div className="container">
      <Input value={value} handleChange={handleChange} ghost={ghost} />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li key={index} className="suggestion-item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
