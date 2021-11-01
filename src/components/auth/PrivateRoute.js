import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./context";

export default function PrivateRoute(props) {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
}
