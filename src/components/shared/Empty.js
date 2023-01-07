import "./Empty.css";
import Button from "./Button";

export default function Empty({ history, advertsCount, ...props }) {
  const handleRedirect = () => {
    history.push("/adverts/new");
  };

  return (
    <div className="empty-container">
      {advertsCount > 0 ? (
        <p className="empty-main-message">
          No hay anuncios con los filtros seleccionados!
        </p>
      ) : (
        <>
          <p className="empty-main-message">No hay anuncios que mostrar!</p>
          <div className="empty-call-to-action">
            Crea tú el primer anuncio ...
            <Button onClick={handleRedirect}>Continuar</Button>
          </div>
        </>
      )}
    </div>
  );
}
