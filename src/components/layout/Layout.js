import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, history, ...props }) {
  return (
    <div className="layout-container">
      <Header history={history} {...props} />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
