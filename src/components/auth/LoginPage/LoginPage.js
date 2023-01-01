import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "../service";
import Types from "prop-types";
import Header from "../../layout/Header";
import "./LoginPage.css";
import Error from "../../shared/Error";
import useForm from "../../hooks/useForm";
import Footer from "../../layout/Footer";

export default function LoginPage({ onLogin, history, location }) {
  const { formValue: credentials, handleChange } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  console.log(process.env);

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
      <Header history={history} location={location} />

      {error && error.status === 404 ? <Redirect to="/404" /> : ""}
      {error && error.status !== 404 ? (
        <Error className="login-error" error={error} />
      ) : (
        ""
      )}

    <form onSubmit={handleSubmit}>
      <div className="login-form-container">
          <h2 className="login-title">Inicia sesión</h2>
          <label className="login-field" htmlFor="email">
            Usuario
            <input
              className="login-input"
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              value={credentials.email}
              autoComplete="off"
            ></input>
          </label>
          <label className="login-field" htmlFor="password">
            Contraseña
            <input
              className="login-input"
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              value={credentials.password}
              autoComplete="off"
            ></input>
          </label>

          <label className="" htmlFor="remember">
            <span style={{ padding: "1rem" }}>Recordarme en este equipo</span>
            <input
              className=""
              checked={credentials.remember}
              onChange={handleChange}
              type="checkbox"
              name="remember"
              id="remember"
              value={credentials.remember}
            />
          </label>

          <button
            className="login-button"
            disabled={!credentials.email || !credentials.password}
            type="submit"
          >
            Continuar
          </button>
          <span>¿Aún no te has registrado?&nbsp;</span>
          <Link to="/signup" className="signup-text">
            <span >Regístrate</span>
          </Link>
      </div>
     </form>
      <Footer />
    </>
  );
}

LoginPage.propTypes = {
  onLogin: Types.func.isRequired,
  history: Types.object.isRequired,
  location: Types.object.isRequired,
};
