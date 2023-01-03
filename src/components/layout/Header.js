import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import Modal from "../shared/Modal";

export default function Header({ history, location, ...props }) {
  const [isModalOn, setIsModalOn] = useState(false);

  const modalProps = {
    isModalOn: isModalOn,

    modalMessage: "¿Realmente quieres cerrar la sesión?",

    showModal: () => {
      setIsModalOn(true);
    },

    hideModal: () => {
      setIsModalOn(false);
    },
  };

  const { isLogged, handleLogout } = useContext(AuthContext);

  const handleRedirect = () => {
    switch (location.pathname){
      case '/adverts/new':
      history.push("/adverts");
      break;
      case '/adverts':
      history.push("/adverts/new")
      break;
      default:
      history.push("/adverts")
    }
  };

  const logoutConfirmation = () => {
    modalProps.showModal();
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <h1>
          Chollopop<span className="logo-icon"></span>
        </h1>
      </Link>

      {isLogged ? (
        <div>
          <button
            type="button"
            className="header-button"
            onClick={handleRedirect}
          >
          {location.pathname === ('/adverts' || '/adverts/') ?  'Crear anuncio' : 'Ver anuncios'}      
          </button>

          <button
            type="button"
            className="header-button"
            onClick={logoutConfirmation}
          >
            Salir
          </button>
          <Modal handleClick={handleLogout} {...modalProps} />
        </div>
      ) : location.pathname === "/signup" ? (
        <Link to="/login" type="button">
          <button className="header-button">Inicia sesión</button>
        </Link>
      ) : (
        <Link to="/signup" type="button">
          <button className="header-button">Regístrate</button>
        </Link>
      )}
    </div>
  );
}
