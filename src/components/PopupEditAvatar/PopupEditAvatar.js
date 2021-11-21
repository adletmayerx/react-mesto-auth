import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }
  
  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        name="avatar"
        type="url"
        className="popup__input popup__input_type_avatar form__input"
        id="avatar-input"
        placeholder="Обновить аватар"
        ref={inputRef}
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
