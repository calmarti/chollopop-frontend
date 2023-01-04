import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

//TODO: PRIORIDADES
//1. Tema renderizado de imagenes en bd del swagger (solve this once and for all!)


export default function Layout({ children, bgColor, history,  ...props }) {
  return (
    <div style={{"backgroundColor": bgColor}}>
      <Header history={history} {...props} />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
