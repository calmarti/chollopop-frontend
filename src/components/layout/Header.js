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
        Chollopop
      </Link>

      {isLogged ? (
        <div>
          <button type="button" className="" onClick={logoutConfirmation}>
            Salir
          </button>
          <Modal handleClick={handleLogout} {...modalProps} />

          <button type="button" className="" onClick={handleRedirect}>
            Crear anuncio
          </button>
        </div>
      ) : (
        <Link  to="/signup" type="button">
          <button className="button">Regístrate</button>
        </Link>
      )}
    </div>
  );
}
