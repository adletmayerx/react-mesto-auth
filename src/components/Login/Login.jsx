import React, { useState, useEffect } from 'react';

export default function Login({ handleSubmit }) {
  return (
    <div className="login">
      <h2 className="title login__title">Вход</h2>
      <form name="login" className="form login__form">
        <input name="email" type="email" className="login__input input input_type_email" placeholder="Email" />
        <input name="password" type="password" className="login__input input input_type_password" placeholder="Пароль" />
        <button type="submit" className="login__submit-button form__submit">Войти</button>
      </form>
    </div>
  );
}