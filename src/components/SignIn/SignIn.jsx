import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="header__sign">
      <Link to="/react-mesto-auth/sign-in" className="header__link link">
        Войти
      </Link>
    </div>
  );
}