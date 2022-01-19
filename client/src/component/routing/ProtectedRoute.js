import React, { useContext } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import NavbarMenu from "../Layout/NavbarMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  //Check user first
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <div>
            <NavbarMenu></NavbarMenu>
            <Component {...rest} {...props} /> 
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
