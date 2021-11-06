import "./Empty.css";
import Button from "./Button";
/* import { Redirect } from "react-router-dom"; */

export default function Empty({history, ...props}) {
  const handleRedirect = () => {
    history.push('/adverts/new');
   
  };

  return (
    <div className="empty-container">
      <p className="empty-main-message">No hay nada para vender o comprar </p>
      <div className="empty-call-to-action">
        Crea tú el primer anuncio ...
        <Button onClick={handleRedirect}>Continuar</Button>
      </div>
    </div>
  );
}
