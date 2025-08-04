import React from "react";
import Styles from "./ContactList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faList, faTimes } from "@fortawesome/free-solid-svg-icons";

const ContactListHeader = ({
  search,
  onSearchChange,
  selection,
  selectedIds,
  onToggleSelection,
  onBack,
  onDeleteMultiple,
}) => {
  return (
    <div className={Styles["title"]}>
      <h1>لیست مخاطبین</h1>
      <input
        type="search"
        placeholder="جستجو بر اساس نام یا ایمیل..."
        className={Styles.searchInput}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className={Styles["button-container"]}>
        {selection ? (
          <>
            <button
              onClick={onDeleteMultiple}
              disabled={selectedIds.length === 0}
              className={Styles.deleteSelectedButton}
            >
              حذف ({selectedIds.length})
            </button>
            <button
              onClick={onToggleSelection}
              className={Styles.cancelButtonGruop}
            >
              <FontAwesomeIcon icon={faTimes} /> لغو
            </button>
          </>
        ) : (
          <>
            <button
              className={Styles["trash-butt"]}
              onClick={onToggleSelection}
            >
              <span className={Styles["label-butt"]}> حذف گروهی </span>
              <FontAwesomeIcon icon={faList} className={Styles["icon-trash"]} />
            </button>
            <button className={Styles["home-butt"]} onClick={onBack}>
              <span className={Styles["label-butt"]}> صفحه اصلی </span>
              <FontAwesomeIcon
                icon={faHouse}
                className={Styles["icon-house"]}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactListHeader;
