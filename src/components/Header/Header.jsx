import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

export default function Header({ headerEmail, signOut }) {
  return (
    <header className="header">
      <img src={logo} alt="лого сайта 'Место'" className="header__logo" />
      <Routes>
        <Route exact path="/">
          <>
            <div className="header__info">
              <p className="header__email">{headerEmail}</p>
              <Link to="/sign-in" className="header__sign-up" onClick={signOut}>
                Выйти
              </Link>
            </div>
          </>
        </Route>
        <Route exact path="/sign-up">
          <>
            <div className="header__sign">
              <Link to="sign-in" className="header__sign-up">
                Войти
              </Link>
            </div>
          </>
        </Route>
        <Route path="/sign-in">
          <>
            <div className="header__sign">
              <Link to="sign-up" className="header__sign-up">
                Регистрация
              </Link>
            </div>
          </>
        </Route>
      </Routes>
    </header>
  );
}
