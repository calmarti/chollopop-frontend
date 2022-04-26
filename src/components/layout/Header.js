import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../auth/context";
import Modal from "../shared/Modal";

export default function Header({ history, ...props }) {
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
    <nav
      className="navbar navbar-expand-lg" /* navbar-light bg-light  *//* "header" */
    >
      <div className="container-fluid" >
        <Link className="navbar-brand logo" to="/">
        Logo
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
            </Link>
          </li>
        </ul>
        {isLogged ? (
          <div>
            <button type="button" className= "btn btn-info mx-2" onClick={logoutConfirmation}>
              Salir
            </button>
            <Modal handleClick={handleLogout} {...modalProps} />

            <button type="button" className="btn btn-info mx-2" onClick={handleRedirect}>
              Crear anuncio
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
