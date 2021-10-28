import { useState } from "react";
import Button from "../../shared/Button";
import { login } from "../service";

export default function LoginPage({ onLogin, history }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(ev) {
    console.log(ev);
    //console.log(ev.target.value);
    setCredentials((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    login(credentials)
      .then(() => {
        onLogin();
        history.push("/adverts");
      })

      //gestionar el 401, crear el estado de error
      //cambiar state isLogged
      .catch((error) => console.log(error));
    //redireccionar al home tras login
    //history.push('/adverts')
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
        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

//export default LoginPage;
