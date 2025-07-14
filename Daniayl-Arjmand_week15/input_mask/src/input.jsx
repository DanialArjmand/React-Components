import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Input = ({ value, handleChange, ghost, handleKeyDown }) => {
  const showGhost =
    ghost.toLowerCase().startsWith(value.toLowerCase()) &&
    ghost.length > value.length;

  const handleClear = () => {
    handleChange({ target: { value: "" } });
  };

  return (
    <div className="input">
      <div className="search-icon">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="#aaa" />
      </div>

      <div className="ghost-text">
        <span>{value}</span>
        <span className="ghost-suggestion">
          {showGhost ? ghost.slice(value.length) : ""}
        </span>
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder="Search..."
      />

      {value && (
        <div className="clear-icon" onClick={handleClear}>
          <FontAwesomeIcon icon={faXmark} size="lg" color="#666" />
        </div>
      )}
    </div>
  );
};

export default Input;
