import React from 'react';
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    <Routes>
      <Route>
        {() => {
          console.log(props.loggedIn);
          props.loggedIn ? (
            <Component {...props} />
          ) : (
            <Navigate to="/sign-in" />
          );
        }
        }
        ;
      </Route>
    </Routes>
  );
};

export default ProtectedRoute;