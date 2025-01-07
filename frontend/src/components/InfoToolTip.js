import closeIcon from "../images/CloseIcon.svg"
import iconSuccess from "../images/success.svg"
import iconError from "../images/Union (1).svg"
function InfoTooltip ({isSuccess,name,isOpen,onClose}){
  const icon = isSuccess ? iconSuccess : iconError;
  const message = isSuccess 
      ?'Vitória! Você esta registrado.'
      : 'Ops, algo saiu deu errado! Por favor, tente novamente.';
  return(
    <div id={`modal-${name}`} className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}>
          <div className="modal__contain">
            <img
              src={closeIcon}
              id={`close-icon-${name}`}
              alt="icono de cierre"
              className="modal__close-icon info-close"
              onClick={onClose}
            />
            <div className="modal__content">
              <img src={icon}
                className="modal__content_img"
                />
              <h4 className="modal__content-title">{message}</h4>
            </div>
            
          </div>
        </div>
  )
}
export default InfoTooltip;