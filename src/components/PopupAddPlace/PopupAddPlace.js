import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function PopupAddPlace({ isOpen, onClose, onAddPlace, buttonText }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(title, link);

    onAddPlace({
      name: title,
      link
    });

    setTitle('');
    setLink('');
  }
  
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-place"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        type="text"
        className="popup__input popup__input_type_title form__input"
        id="title-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <span className="form__input-error title-input-error"></span>
      <input
        name="link"
        type="url"
        className="popup__input popup__input_type_link form__input"
        id="link-input"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={e => setLink(e.target.value)}
        required
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
