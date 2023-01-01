import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="">
      <h1 className="chollopop-title">
        Chollopop<span className="logo-icon"></span>
      </h1>
      <p className="chollopop-description">
        La web de los que encuentran lo que buscan
      </p>
      <p className="chollopop-question">¿Que necesitas hoy?</p>

      <div>SECCION DE ICONOS</div>
      <button>Continuar</button>
      <Link to="/login">
        <button>Inicia sesión</button>
      </Link>
    </div>
  );
}
