import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [isPatching, setIsPatching] = React.useState(false);

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value); 
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsPatching(true);
        onAddPlaceSubmit({
        name: title,
        link,
        });
    }
    return(
        <PopupWithForm 
        name="add-post" 
        title="Novo Local"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        textBtn={isPatching ? "Criando..." : "Criar"}>
        <input
          name="name"
          type="text"
          className="popup__input"
          id="title"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
          value={title}
          onChange={handleChangeTitle}
        />
        <span className="popup__error" id="title-error" />
        <input
          name="link"
          type="url"
          className="popup__input"
          id="image-link"
          placeholder="Link de imagem"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__error" id="image-link-error" />
        </PopupWithForm>

    )
}