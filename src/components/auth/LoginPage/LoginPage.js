import { useState } from "react";
import Button from "../../shared/Button";
import { login } from "../service";
import types, { func, object } from "prop-types";
import Header from "../../layout/Header";
import './LoginPage.css';

//TODO: implementar funcionalidad de 'recordar contraseña'

export default function LoginPage({ onLogin, history, location }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  function handleInputChange(event) {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoader(true);
    login(credentials)
      .then(() => {
        setLoader(false);
        onLogin();
        const { from } = location.state || { from: "/adverts" };
        history.replace(from);
      })
      //gestionar el 401 y resto de errores, crear el estado de error
      //crear estado isLoading y gestionar su renderizado
      .catch((error) => {
        setLoader(false);
        setError(error);
      });
  }

  return (
    <>
      <Header history={history} />
      
        <h2 className="login-title">Inicia sesión</h2>

          <form onSubmit={handleSubmit}>
        <div className="login-form-container">
            <label className="login-form-label" htmlFor="email">
              Usuario
              <input
              className="login-form-input username-input"
                id="email"
                onChange={handleInputChange}
                type="text" //considerar cambiar a 'email'
                name="email"
                value={credentials.email}
                autoFocus
              ></input>
            </label>
            <label className="login-form-label" htmlFor="password">
              Contraseña
              <input
              className="login-form-input"
                id="password"
                onChange={handleInputChange}
                type="password"
                name="password"
                value={credentials.password}
              ></input>
            </label>

            <Button
              className="login-form-button"
              disabled={!credentials.email || !credentials.password}
              variant="primary"
              type="submit"
            >
              Iniciar Sesión
            </Button>
        </div>
          </form>
        {error ? <div className="error">{error.message}</div> : null}
        {loader ? "Loading..." : null}
      
    </>
  );
}

LoginPage.propTypes = {
  onLogin: types.func.isRequired,
  history: types.object.isRequired,
  location: types.object.isRequired,
};
