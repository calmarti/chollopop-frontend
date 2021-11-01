import './Layout.css';
import Header from "./Header";

export default function Layout({children, history, ...props}) {
  return (
    <div className="layout-container">
      <Header history={history} {...props} />
        <main className="layout-main"  style={{backgroundColor:'orange'}}>Layout minimalista
         {children}
        </main>
    </div>
  );
}
