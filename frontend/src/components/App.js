import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate} from "react-router-dom"
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import NewCard from "./NewCard";
import ConfirmDelete from "./ConfirmDelete";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState("");
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [cardToDelete, setCardToDelete] = useState(null);
 
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  function handleDeletePopupClick(card) {
    setCardToDelete(card); 
    setIsDeletePopupOpen(true); 
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = () =>{
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
  }


  // useEffect(() => {
  //   if (isLogged) {
  //     api.defaultProfile(token).then((data) => {
  //       setCurrentUser(data.data);
  //     }).catch(err => console.log(err));

  //     api.getInitialCards(token).then((data) => {
  //       setCards(data.data);
  //     }).catch(err => console.log(err));
  //   }
  // }, [isLogged, token]);


  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   console.log('token app front',token)
  //   if (token) {
  //     auth.getToken(token)
  //       .then((res) => {
  //         if (res) {
  //           setEmailUser(res.data.email);
  //           setToken(token);
  //           setIsLogged(true);
  //           navigate("/", { replace: true });
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  // },[]);


  // function handleLogin(){
  //   setIsLogged(true)
  // }


  // function signOff() {
  //   localStorage.removeItem('jwt');
  //   setToken('');
  //   setIsLogged(false);
  //   setEmailUser('');
  //   navigate('/signin');
  // }

  useEffect(() => {
    if (token) {
      auth.getToken(token)
        .then((data) => {
          if (data) {
            setIsLogged(true);
            setEmailUser(data.email);
            navigate('/');
          } else {
            throw new Error('Token inválido');
          }
        })
        .catch((err) => {
          console.error(err);
          signOff();
        });
    }
  }, [token]);

  function handleLogin(jwt) {
    localStorage.setItem('jwt', jwt);
    setToken(jwt);
    setIsLogged(true);
  }
  
  function signOff() {
    localStorage.removeItem('jwt');
    setToken('');
    setIsLogged(false);
    setEmailUser('');
    navigate('/signin');
  }


  useEffect (() => {
    api.getUserInfo().then((ApiUserInfo) => {
      setCurrentUser(ApiUserInfo)
    })
    .catch((err) => {
      console.log("Erro ao carregar dados do usuário: ", err);
    });
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .updateUserProfile(name, about)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error("Erro ao atualizar o perfil: ${err}"); 
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Erro ao atualizar o avatar: ${err}`); // Se há um erro, será exibido no console;
      });
  }

  function handleNewCardSubmit({ link, name }) {
    api
      .createCard(link, name)
      .then((newCard) => {
        setCards([newCard, ...cards]); // Atualiza o novo card
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Erro ao adicionar um novo card ${err}`); // Se há um erro, será exibido no console;
      });
  }

  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Erro ao carregar os cartões: ", err);
      });
  }, []);


  async function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    await api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard
        ));
      })
      .catch((error) => console.error(error));
  }


  function handleCardDelete(card) {
    if (!cardToDelete) {
      return;
    }

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
       
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.error(`Erro ao eliminar o cartao: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route element={<ProtectedRoute loggedIn={isLogged} />}>
        <Route
              path="/"
              element={
                <>
                  <Header 
                  signText={"Sair"}
                  email={emailUser}
                  onClick={signOff}
                  linkRoute={'/signin'}
                  />

                  <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeletePopupClick} 
                  onCardLike={handleCardLike}
                  />

                  <ImagePopup 
                  card={selectedCard}  
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}  
                  />

                  <EditProfile
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  />

                  <EditAvatar
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}/>

                  <NewCard
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlaceSubmit={handleNewCardSubmit}/>
                  
                  <ConfirmDelete
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onConfirmDelete={handleCardDelete}/>
                
                </>
                
              }
            />
          </Route>
        <Route
              path="/signin"
              element={
                <>
                  <Login
                    onLoginSuccess={handleLogin}
                  />
                </>
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  <Register/>
                </>
              }
              />
          </Routes>
     <div className="page">
      <Footer />
     </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
