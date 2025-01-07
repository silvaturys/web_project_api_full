import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirmDelete,
}) {
  const [isPatching, setIsPatching] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onConfirmDelete(); 
  }

  return (
    <PopupWithForm 
    name="delete-confirmation"
    title="Tem certeza?"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    textBtn={isPatching ? "Excluindo..." : "Sim"}
  ></PopupWithForm>
    
  );
}