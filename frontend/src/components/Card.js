import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ data, onCardClick, onCardDelete, onCardLike }) {
    const {link, likes, name, owner} = data;
    const currentUser = useContext(CurrentUserContext);

    const isOwn = owner._id === currentUser._id;

    const cardDeleteButtonClassName = `element__button_trash ${
        isOwn ? "element__button_trash_visible" : "element__button_trash_hidden"
      }`;

    const isLiked = likes.some((user) => user._id === currentUser._id);

    const cardLikeButtonClassName = `element__button ${isLiked ? "elements__icon-active" : ""}`;

    const handleClick = () => {
        onCardClick(data);  
      };
      
      const handleLikeClick = () => {
        onCardLike(data);
      };

      const handleDeleteClick = () => {
        onCardDelete(data); 
      };
      
      
    return(
        <div className="element">
      {isOwn && (
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
        </button>
      )}
      <img className="element__image" src={link} alt={name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__text">{name}</h2>
        <div className="element__info-like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
          </button>
          <span className="elements__likes-number">{likes.length}</span>
        </div>
      </div>
    </div>
    )
}