import Button from "../shared/Button";
import { Link } from 'react-router-dom';

export default function Header({ isLogged }) {
  return (
    <div className="header">
      <div className="logo"></div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/adverts">Home</Link>
          </li>
        </ul>
        {isLogged ? (
          <Button>Salir</Button>
        ) : (
          <Button to="/login" as={Link}>
            Iniciar sesión
          </Button>
        )}
      </nav>
    </div>
  );
}
