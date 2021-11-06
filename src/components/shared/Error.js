
export default function Error({ className, error }) {
  return (
    <p className={className}>
      Error {error.response.status}: {error.message}
    </p>
  );
}
