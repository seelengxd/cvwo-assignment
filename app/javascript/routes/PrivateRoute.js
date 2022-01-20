// https://dev.to/nilanth/how-to-create-public-and-private-routes-using-react-router-72m
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
