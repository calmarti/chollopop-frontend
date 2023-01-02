import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

//TODO: PRIORIDADES
//1. Tema renderizado de imagenes en bd del swagger (solve this once and for all!)


export default function Layout({ children, history,  ...props }) {
  return (
    <div className="">
      <Header history={history} {...props} />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
