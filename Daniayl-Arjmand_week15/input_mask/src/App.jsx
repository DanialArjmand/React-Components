import { useState } from "react";
import Input from "./input.jsx";
import data from "./cities.json";

function App() {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (event) => {
    const val = event.target.value;
    setValue(val);

    const match = data.find((item) =>
      item.toLowerCase().startsWith(val.toLowerCase())
    );

    if (match) {
      setSuggestion(match);
    } else {
      setSuggestion(val);
    }
  };

  return (
    <div>
      <Input
        value={value}
        handleChange={handleChange}
        suggestion={suggestion}
      />
    </div>
  );
}

export default App;
