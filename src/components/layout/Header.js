import "./Header.css";
import Button from "../shared/Button";
import { Link, Redirect } from "react-router-dom";
import { useContext, useState, Fragment } from "react";
import AuthContext from "../auth/context";
import Modal from "../shared/Modal";

//TODO: LEER SIEMPRE LA PARTE RELEVANTE DEL ENUNCIADO ANTES DE CREAR ALGO NUEVO!!!!!!!!!!!!!!!!
//TODO: Estilos a header y navbar minimamente funcionales (botones dentro y barra fija)
//por último: botón 'crear anuncio' sólo en AdvertsPage y AdvertPage (fuera de NewAdvertPage)

//TODO: Un componente Card reutilizable para AdvertsPage (flexbox con Cards) y AdvertPage 

//TODO: en el enunciado dice que los enlaces deben ser con Link, revisar video a ver si tambien le vale history.push

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
    <header className="header">
      <nav className="header-nav">
        <Link className="header-link" to="/">
          <div className="logo">Logo</div>
        </Link>
        <Link className="header-link" to="/">
          Home
        </Link>
        {isLogged ? ( //OJO: al ser login la única ruta NO protegida y no tener login barra de menú no tiene mucho sentido el último botón..
          <>
            <Button className="header-button" onClick={logoutConfirmation}>
              Salir
            </Button>
            <Modal handleClick={handleLogout} {...modalProps} />

            <Button className="header-button" onClick={handleRedirect}>
              Crear anuncio
            </Button>
          </>
        ) : (
          <Button className="header-button" to="/login" as={Link}>
            Iniciar sesión
          </Button>
        )}
      </nav>
    </header>
  );
}
