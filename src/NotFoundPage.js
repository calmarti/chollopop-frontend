import './NotFoundPage.css';
 
export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <p className="not-found-status">404</p>
      <p className="not-found-message">
        Lo sentimos, la página que buscas no ha podido ser encontrada
      </p>
    </div>
  );
}
