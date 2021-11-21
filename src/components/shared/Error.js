export default function Error({ className, error }) {
  return (
    <p className={className}>
      {error.status ===401
        ? "Nombre de usuario ó contraseña no válida"
        : error.message }
    </p>
  );
}
