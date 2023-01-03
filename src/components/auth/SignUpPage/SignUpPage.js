import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./SignUpPage.css";
import { useState } from "react";

//TODO: handleChange y handleSubmit
//TODO: llamada al api de nodepop (ver el swagger) - crear método post en el cliente de axios
//TODO: comprobar creación de usuario en el backend
//TODO: validación cruzada de la contraseña




export default function SignUpPage({history, location}){

const [newUser, setNewUser] = useState({email:"", password:""});


const handleChange = (event) => {
  setNewUser((prevState)=> ({...prevState, [event.target.name]: event.target.value}))
}

console.log(newUser);

const handleSubmit = () => {}

  return (
    <>
    <Header history={history} location={location} />
    <div className="form-wrapper">
      <h2 className="form-title">Regístrate</h2>

      <form className="signup-form">

        <div className="signup-group">
          <label>Usuario</label>
          <input
            className="signup-input"
            type="email"
            placeholder="Tu email..."
            onChange={handleChange}
          ></input>
        </div>

        <div className="signup-group">
          <label>Contraseña</label>
          <input
            className="signup-input"
            type="password"
            placeholder="Tu contraseña"
            onChange={handleChange}
          ></input>
        </div>

        <div className="signup-group">
        <label>Confirma tu contraseña</label>
        <input
          className="signup-input"
          type="password"
          placeholder="Confirma tu contraseña"
        ></input>
        </div>
        <button className="signup-button" type="submit" onSubmit={handleSubmit}>Continuar</button>
      </form>
 
    </div>
 <Footer/>
    </>
  );
}