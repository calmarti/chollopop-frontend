import "./Empty.css";
import Button from "./Button";

export default function Empty({ history, message, ...props }) {
  const handleRedirect = () => {
    history.push("/adverts/new");
  };

  return (
    <div className="empty-container">
      <p className="empty-main-message">{message}</p>
      {message === "No hay nada para vender o comprar" ? (
        <div className="empty-call-to-action">
          Crea tú el primer anuncio ...
          <Button onClick={handleRedirect}>Continuar</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
