

export default function Error({ className, error , errorStyle}) {
  return (
    <p className={className} /* style={errorStyle} */>
      Error {error.response.status}: {error.message}
    </p>
  );
}
