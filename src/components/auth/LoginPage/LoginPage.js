import { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../shared/Button";
import { login } from "../service";
import Types from "prop-types";
import Header from "../../layout/Header";
import "./LoginPage.css";
import Error from "../../shared/Error";
import useForm from "../../hooks/useForm";

export default function LoginPage({ onLogin, history, location }) {

  const { formValue: credentials, handleChange } = useForm({
    email: "",
    password: "",
    remember:false
  });

  const [error, setError] = useState(null);


  function handleSubmit(event) {
    event.preventDefault();
    login(credentials)
      .then(() => {
        onLogin();
        const { from } = location.state || { from: "/adverts" };
        history.replace(from);
      })
      .catch((error) => {
        setError(error);
      });
  }


  return (
    <>
      <Header history={history} />

      <h2 className="login-title">Inicia sesión</h2>

      {error && error.status == 404 ? <Redirect to="/404" /> : ""}
      {error && error.status != 404 ? (
        <Error className="login-error" error={error} />
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <div className="login-form-container">
          <label className="login-form-label" htmlFor="email">
            Usuario
            <input
              className="login-form-input username-input"
              id="email"
              onChange={handleChange}
              type="email"
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
              onChange={handleChange}
              type="password"
              name="password"
              value={credentials.password}
            ></input>
          </label>

          <label className="reminder-label" htmlFor="reminder">
            Recordarme en este equipo
            <input
              className="reminder-input"
              checked={credentials.remember}
              onChange={handleChange}
              type="checkbox"
              name="remember"
              id="remember"
            />
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
    </>
  );
}

LoginPage.propTypes = {
  onLogin: Types.func.isRequired,
  history: Types.object.isRequired,
  location: Types.object.isRequired,
};
