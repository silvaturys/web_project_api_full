import closeIcon from "../images/CloseIcon.svg"

export default function ImagePopup({ card,  isOpen, onClose}){
    return(
        <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} id="PopupImage">
            <div className="popup__content-image">
                <button className="popup__type-close" id="CloseImagePopup" onClick={onClose}>
                <img
                    src={closeIcon}
                    className="popup__icon popup__icon-close"
                    alt="simbolo de X, fechar"
                />
                </button>
                {card && (
          <>
            <img src={card.link} alt={card.name} className="popup__image" />
            <p className="popup__paragraph"> {card.name} </p>
          </>
        )}
      </div>
        </section>
    );
}