import { useState } from "react";
import Button from "../../shared/Button";
import { login } from "../service";
import types, { func, object } from "prop-types";


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
    <div>
      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Usuario
          <input
            id="email"
            onChange={handleInputChange}
            type="text" //considerar cambiar a 'email'
            name="email"
            value={credentials.email}
            autoFocus
          ></input>
        </label>
        <label htmlFor="password">
          Contraseña
          <input
            id="password"
            onChange={handleInputChange}
            type="password"
            name="password"
            value={credentials.password}
          ></input>
        </label>

        <Button
          disabled={!credentials.email || !credentials.password}
          variant="primary"
          type="submit"
        >
          Iniciar Sesión
        </Button>
      </form>
      {error ? <div className="error">{error.message}</div> : null}
      {loader ? "Loading..." : null}
    </div>
  );
  
}

LoginPage.propTypes = {
  onLogin: types.func.isRequired,
  history: types.object.isRequired,
  location: types.object.isRequired
};