

export default function Error({ className, error}) {
  return (
    <p className={className} >
      {error.statusCode}  {error.message}
    </p>
  );
}
