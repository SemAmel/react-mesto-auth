import {useEffect} from "react";

const Popup = ({isOpen, name, onClose, children}) => {
  useEffect(() => {
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
