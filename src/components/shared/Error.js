export default function Error({ className, error }) {
  return (
    <p className={className}>
      {error.status ===401
        ? "Acceso no autorizado"
        : error.message }
    </p>
  );
}
