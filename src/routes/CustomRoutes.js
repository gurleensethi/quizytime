import React from "react";
import AuthProvider from "../context/AuthProvider";
import { Route, Redirect } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <AuthProvider.Consumer>
        {({ isLoggedIn }) => {
          if (!isLoggedIn) {
            console.log("Redirecting to sign in...");
            return <Redirect to={AppRoutes.SIGNIN} />;
          }
          return (
            <Route
              path={this.props.path}
              render={props => <Component {...props} />}
              {...rest}
            />
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}

export class PublicRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <AuthProvider.Consumer>
        {({ isLoggedIn }) => {
          if (isLoggedIn) {
            return <Redirect to={AppRoutes.HOME} />;
          }
          return (
            <Route
              path={this.props.path}
              render={props => <Component {...props} />}
              {...rest}
            />
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}
