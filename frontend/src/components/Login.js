import React,{useEffect, useState} from 'react'
import FormUser from "./FormUser";
import Header from "./Header";
import InfoTooltip from './InfoToolTip';
import { useLocation, useNavigate } from 'react-router-dom'
import *as auth from '../utils/auth'

function Login({onLoginSuccess}) {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const[successRegister, setSuccessRegister] = useState(false)
  const[shoulBeInfoOpen, setShouldBeInfoOpen] = useState(false)
  const [authError, setAuthError] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  // fecha o infotool
  function closeInfoTooltip(){
    setShouldBeInfoOpen(false)
  }

  // abre o infotool se for certo
  useEffect(()=>{
    if(location.state === 'success'){
      setSuccessRegister(true)
      setShouldBeInfoOpen(true)
    }
  },[location.state]);

  // Manipula o input
  function handleChange(event){
    const {name, value} = event.target
    setUserCredentials({
      ...userCredentials, [name]: value
    })

  };

  //Manipulação do submit
  function handleSubmit(event) {
    event.preventDefault();
    if (!userCredentials.email || !userCredentials.password) {
      return;
    }
    auth
      .authorize(userCredentials.email, userCredentials.password)
      .then((data) => {
        if (data.token) {
          setUserCredentials({
            email: '',
            password: '',
          });
          onLoginSuccess();;
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error); // Para debug
        setAuthError(true); // Marca como erro de autenticação
        setShouldBeInfoOpen(true); // Abre o modal
      });
  }
  return (
    <>
      <Header
      linkRoute={"/signup"}
      signText={'Inscrever-se'}
      />
      <FormUser
      title={"Entrar"}
      buttonText={"Iniciar sessão"}
      linkSpan={"/signup"}
      linkText={"Ainda não é membro? Inscreva-se aqui!"}
      onSubmit={handleSubmit}
      onChange={handleChange}
      >
      </FormUser>
      <InfoTooltip
        isSuccess={!authError && successRegister}
        isOpen={shoulBeInfoOpen}
        name={"tooltip"}
        onClose={closeInfoTooltip}
      />
    </>
  );
}
export default Login;