import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="header__sign">
      <Link to="/sign-up" className="header__link  link">
        Зарегистрироваться
      </Link>
    </div>
  );
}