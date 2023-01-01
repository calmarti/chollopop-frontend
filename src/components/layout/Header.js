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
    history.push("/adverts/new");
  };

  const logoutConfirmation = () => {
    modalProps.showModal();
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        Chollopop<span className="logo-icon"></span>
      </Link>

      {isLogged ? (
        <div>
          <button type="button" className="header-button" onClick={logoutConfirmation}>
            Salir
          </button>
          <Modal handleClick={handleLogout} {...modalProps} />

          <button type="button" className="header-button" onClick={handleRedirect}>
            Crear anuncio
          </button>
        </div>
      ) : (
        <Link  to="/signup" type="button">
          <button className="header-button">Regístrate</button>
        </Link>
      )}
    </div>
  );
}
