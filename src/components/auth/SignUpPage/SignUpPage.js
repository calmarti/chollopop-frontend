import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./SignUpPage.css";
import { useState } from "react";
import { signUp } from "../service";



export default function SignUpPage({ history, location }){

const [newUser, setNewUser] = useState({name:"", email:"", password:"", username:""});
const [confirmedPassword, setConfirmedPassword]  = useState("");

const handleChange = (event) => {
  setNewUser((prevState)=> ({...prevState, [event.target.name]: event.target.value}))
}

console.log(newUser);

const handleSubmit = (event) => {
  event.preventDefault();
  signUp(newUser)
  .then(()=> history.push("/adverts"))
  .catch(error=>console.log(error));
  //TODO: crear mensajes de error general
}


const disabled = !newUser.name || !newUser.username || !newUser.email || !newUser.password || (newUser.password !== confirmedPassword);
console.log(disabled);

// console.log(confirmedPassword.current.value);

  return (
    <>
      <Header history={history} location={location} />
      <div className="form-wrapper">
        <h2 className="form-title">Regístrate</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-group">
            <label>Nombre</label>
            <input
              name="name"
              className="signup-input"
              type="text"
              placeholder="Nombre y apellidos..."
              onChange={handleChange}
              value={newUser.name}
            ></input>
          </div>

          <div className="signup-group">
            <label>Usuario</label>
            <input
              name="username"
              className="signup-input"
              type="text"
              placeholder="Nombre de usuario..."
              onChange={handleChange}
              value={newUser.username}
            ></input>
          </div>

          <div className="signup-group">
            <label>Email</label>
            <input
              name="email"
              className="signup-input"
              type="email"
              placeholder="Email..."
              onChange={handleChange}
              value={newUser.email}
            ></input>
          </div>

          <div className="signup-group">
            <label>Contraseña</label>
            <input
              name="password"
              className="signup-input"
              type="password"
              placeholder="Contraseña..."
              onChange={handleChange}
              value={newUser.password}
            ></input>
          </div>

          <div className="signup-group">
            <label>Confirmar</label>
            <input
              className="signup-input"
              type="password"
              placeholder="Confirma la contraseña..."
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
            ></input>
          </div>
          <button className="signup-button" type="submit" disabled={disabled}>
            Continuar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}