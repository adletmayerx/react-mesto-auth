import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PopupEditAvatar from "./PopupEditAvatar/PopupEditAvatar";
import PopupEditProfile from "./PopupEditProfile/PopupEditProfile";
import PopupAddPlace from "./PopupAddPlace/PopupAddPlace";
import PopupDeleteConfirm from "./PopupDeleteConfirm/PopupDeleteConfirm";
import ImagePopup from "./PopupImage/PopupImage";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PopupSuccess from "./PopupSuccess/PopupSuccess";
import PopupFail from "./PopupFail/PopupFail";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [deletingCardId, setDeletingCardId] = useState("");
  const [buttonAvatarText, setButtonAvatarText] = useState("Сохранить");
  const [buttonProfileText, setButtonProfileText] = useState("Сохранить");
  const [buttonAddPlaceText, setButtonAddPlaceText] = useState("Создать");
  const [buttonDeleteText, setButtonDeleteText] = useState("Да");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  let navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleRemoveButtonClick = (id) => {
    setDeletingCardId(id);
    setIsDeleteConfirmPopupOpen(true);
  };

  const handleCardClick = (url, title) => {
    setSelectCard({ url, title });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsFailPopupOpen(false);
    setIsSuccessPopupOpen(false);

    setSelectCard({});
  };

  const handleEscClick = (e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  };

  const handleUpdateUser = (name, about) => {
    setButtonProfileText("Сохранение...");
    api
      .editProfile(name, about)
      .then((res) => setCurrentUser(res))
      .then(() => {
        closeAllPopups();
        setButtonProfileText("Сохранить");
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setButtonAvatarText("Сохранение...");
    api
      .editAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .then(() => {
        closeAllPopups();
        setButtonAvatarText("Сохранить");
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleAddPlaceSubmit = (name, link) => {
    setButtonAddPlaceText("Сохранение...");
    api
      .addCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => {
        closeAllPopups();
        setButtonAddPlaceText("Создать");
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleCardDelete = () => {
    setButtonDeleteText("Удаление...");
    api
      .deleteCard(deletingCardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletingCardId));
      })
      .then(() => {
        closeAllPopups();
        setButtonDeleteText("Да");
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleCardLike = (likes, id) => {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .removeLike(id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    } else {
      api
        .addLike(id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUserEmail("");
    navigate("/react-mesto-auth");
  };

  const handleSignIn = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUserEmail(email);
        navigate("/react-mesto-auth");
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };
  const handleSignUp = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsSuccessPopupOpen(true);

          navigate("/react-mesto-auth/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);

        setIsFailPopupOpen(true);

        return [];
      });
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      auth
        .checkToken(localStorage.getItem("jwt"))
        .then(() => {
          setLoggedIn(true);
          navigate("/react-mesto-auth");
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscClick);
    return () => {
      document.removeEventListener("keydown, handleEscClick");
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        headerEmail={currentUserEmail}
        signOut={handleSignOut}
        loggedIn={loggedIn}
      />

      <Routes>
        <Route
          exact
          path="/react-mesto-auth/sign-in"
          element={<Login handleSignIn={handleSignIn} />}
        ></Route>

        <Route
          exact
          path="/react-mesto-auth/sign-up"
          element={<Register handleSignUp={handleSignUp} />}
        ></Route>

        <Route
          exact
          path="/react-mesto-auth"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onRemoveButtonClick={handleRemoveButtonClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          }
        />
      </Routes>

      <Footer />

      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={buttonAvatarText}
      />

      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={buttonProfileText}
      />

      <PopupAddPlace
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        buttonText={buttonAddPlaceText}
      />

      <ImagePopup
        onClose={closeAllPopups}
        url={selectedCard.url}
        title={selectedCard.title}
      />

      <PopupDeleteConfirm
        isOpen={isDeleteConfirmPopupOpen}
        onClose={closeAllPopups}
        onDelete={handleCardDelete}
        buttonText={buttonDeleteText}
      />

      <PopupSuccess
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        onEscClick={handleEscClick}
      />
      <PopupFail
        isOpen={isFailPopupOpen}
        onClose={closeAllPopups}
        onEscClick={handleEscClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
