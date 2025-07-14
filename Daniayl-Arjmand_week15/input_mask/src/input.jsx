/* eslint-disable react/prop-types */
import "./index.css";

const Input = ({ value, handleChange, suggestion }) => {
  return (
    <div className="input">
      <div className="ghost-text">
        <span>{value}</span>
        <span className="ghost-suggestion">
          {suggestion.slice(value.length)}
        </span>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
