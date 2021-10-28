import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import AdvertsPage from "./components/adverts/AdvertsPage";
import AdvertPage from "./components/adverts/AdvertPage";
import NewAdvertPage from "./components/adverts/NewAdvertPage";
import { useState, useContext } from "react";
import { AuthProvider, AuthConsumer } from "./components/auth/context";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  function handleIsLogged() {
    setIsLogged(true);
  }

  return (
    <Router>
      <AuthProvider value={{handleIsLogged}}>
        <Switch>
          <Route path="/login">
            {(routeProps) => (
              <AuthConsumer>
                { value => <LoginPage onLogin = {value.handleIsLogged} history={routeProps.history} /> }
              </AuthConsumer>
            )}
          </Route>
          <Route path="/adverts/new" component={NewAdvertPage}></Route>
          <Route path="/adverts/:advertId" component={AdvertPage}></Route> */
          <Route path="/adverts">
            <AdvertsPage isLogged={isLogged} />
          </Route>
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <Route path="/404">Not Found</Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
