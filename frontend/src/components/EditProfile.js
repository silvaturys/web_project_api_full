import React, { useState, useContext, useEffect } from 'react';
import {CurrentUserContext }from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  // Variáveis de estado para os campos de formulário
  const [name, setName] = useState(currentUser.name || ''); 
  const [description, setDescription] = useState(currentUser.about || '');
  const [isPatching, setIsPatching] = React.useState(false);

  // Atualizando valores dos inputs em tempo real
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  
  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onUpdateUser({
      name,
      about: description,
    });
  }


  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm 
        name="edit-profile" 
        title="Editar Perfil"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        textBtn={isPatching ? "Salvando..." : "Salvar"}>
        <input
          type="text"
          className="popup__input"
          id="name"
          name="name"
          placeholder="Nome"
          autoComplete="name"
          minLength={2}
          maxLength={40}
          required
          value={name} 
          onChange={handleNameChange} 
        />
        <span className="popup__error" id="name-error" />
        <input
          name="about"
          type="text"
          className="popup__input"
          id="area"
          placeholder="Sobre mim"
          minLength={2}
          maxLength={200}
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="area-error" />
        </PopupWithForm>
  );
}