import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../shared/Button";
import { login } from "../service";
import Types from "prop-types";
import Header from "../../layout/Header";
import "./LoginPage.css";
import Error from "../../shared/Error";
import storage from "../../../utils/storage";

export default function LoginPage({ onLogin, history, location }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (reminder) {
      const remindedEmail = storage.get("email");
      const remindedPassword = storage.get("password");
      if (remindedEmail || remindedPassword) {
        setCredentials({ email: remindedEmail, password: remindedPassword });
      }
    }
  }, [reminder]);

  function handleInputChange(event) {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(credentials)
      .then(() => {
        onLogin();
        if (reminder) {
          storage.set("email", credentials.email);
          storage.set("password", credentials.password);
        }
        const { from } = location.state || { from: "/adverts" };
        history.replace(from);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function switchReminder() {
    reminder ? setReminder(false) : setReminder(true);
  }

  return (
    <>
      <Header history={history} />

      <h2 className="login-title">Inicia sesión</h2>

      {error && error.response.data.status == 404 ? <Redirect to="/404" /> : ""}
      {error && error.response.data.status != 404 ? <Error className="login-error" error={error} /> : ""}

      <form onSubmit={handleSubmit}>
        <div className="login-form-container">
          <label className="login-form-label" htmlFor="email">
            Usuario
            <input
              className="login-form-input username-input"
              id="email"
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              type="password"
              name="password"
              value={credentials.password}
            ></input>
          </label>

          <label className="reminder-label" htmlFor="reminder">
            Recordar mis datos
            <input
              className="reminder-input"
              checked={reminder}
              onChange={switchReminder}
              type="checkbox"
              name="reminder"
              id="reminder"
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
