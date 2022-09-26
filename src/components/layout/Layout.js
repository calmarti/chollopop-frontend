import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

//TODO: PRIORIDADES
//1. Tema estilos, en particular: paleta de colores!
//2. Crear logo con CANVA
//3. Ordenar y limpiar, sobretodo estilos css propios + bootstrap
//4. Tema renderizado de imagenes en bd del swagger (solve this once and for all!)


export default function Layout({ children, history,  ...props }) {
  return (
    <div className="layout-container">
      <Header history={history} {...props} />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
