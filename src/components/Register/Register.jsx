import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email  || password) {
      handleSignUp(email, password);
    }
  };

  return (
    <div className="register">
      <h2 className="title register__title">Регистрация</h2>
      <form name="register" className="form register__form">
        <input
          name="email"
          type="email"
          className="register__input input input_type_email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          name="password"
          type="password"
          className="register__input input input_type_password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          className="register__submit-button form__submit"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-up" className="link register__tip">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
