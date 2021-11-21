import React, { useState, useEffect } from 'react';
import { Link } from 'react';

export default function Register() {
  return (
    <div className="register">
      <h2 className="title register__title">Регистрация</h2>
      <form name="register" className="form register__form">
        <input name="email" type="email" className="register__input input input_type_email" />
        <input name="password" type="password" className="register__input input input_type_password" />
        <button type="submit" className="register__submit-button form__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-up" className="link register__tip">Уже зарегистрированы? Войти</Link>
    </div>
  )
}