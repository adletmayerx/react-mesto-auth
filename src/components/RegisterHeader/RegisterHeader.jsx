import React from "react";
import { Link } from "react-router-dom";

export default function RegisterHeader() {
  return (
    <div className="header__sign">
      <Link to="/react-mesto-auth/sign-up" className="header__link  link">
        Зарегистрироваться
      </Link>
    </div>
  );
}