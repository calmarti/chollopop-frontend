import Header from "./Header";

export default function Layout({isLogged, children, ...props}) {
  return (
    <div style={{backgroundColor:'orange'}}>
      <Header isLogged={isLogged} {...props} />
        <main>Layout minimalista
          <section>{children}</section>
        </main>
    </div>
  );
}
