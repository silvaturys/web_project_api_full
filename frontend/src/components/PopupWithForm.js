import closeIcon from "../images/CloseIcon.svg"

export default function PopupWithForm({ title, name, children, isOpen, onClose, isDeleteConfirmation, onSubmit, textBtn }) {
    return(
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" onClick={onClose}>
                <img src={closeIcon} alt="Fechar" className="popup__close-icon" />
                </button>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                {children}
          <button className="popup__button" type="submit"> {textBtn} </button>
                </form>
            </div>
        </div>
    );
}