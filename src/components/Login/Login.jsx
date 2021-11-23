import React, { useState } from 'react';

export default function Login({ handleSignIn }) {
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
      handleSignIn(email, password);
    }
  };
  
  return (
    <div className="login">
      <h2 className="title login__title">Вход</h2>
      <form name="login" className="form login__form">
        <input name="email" type="email" className="login__input input input_type_email" placeholder="Email" value={email}
          onChange={handleChangeEmail} />
        <input name="password" type="password" className="login__input input input_type_password" placeholder="Пароль" value={password}
          onChange={handleChangePassword}/>
        <button type="submit" className="login__submit-button form__submit" onClick={handleSubmit}>Войти</button>
      </form>
    </div>
  );
}