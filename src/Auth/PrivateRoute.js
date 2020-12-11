import React from "react";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({children, rest}) => {
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;