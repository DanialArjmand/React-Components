/* eslint-disable react/prop-types */
import "./index.css";

const Input = ({ value, handleChange, ghost }) => {
  return (
    <div className="input">
      <div className="ghost-text">
        <span>{value}</span>
        <span className="ghost-suggestion">{ghost.slice(value.length)}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        placeholder="Search..."
      />
    </div>
  );
};

export default Input;
