import React from 'react';
import { Routes, Route} from 'react-router-dom';
import logo from '../../images/logo.svg'
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

export default function Header({ headerEmail, signOut, loggedIn }) {
  return (
    <header className="header">
      <img src={logo} alt="лого сайта 'Место'" className="header__logo" />
      <Routes>
        {loggedIn && <Route exact path="/react-mesto-auth" element={<HeaderInfo headerEmail={headerEmail} signOut={signOut} />} />}
        <Route exact path="react-mesto-auth/sign-up" element={<SignIn />} />
        <Route exact path="react-mesto-auth/sign-in" element={<SignUp />} />
      </Routes>
    </header>
  );
}