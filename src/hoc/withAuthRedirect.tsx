import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
let mapStateToPropsForRedirect = (state?: any) => ({
  isAuth: state.auth.isAuth,
});
export function withAuthRedirect<T>(Component: React.ComponentType) {
  class RedirectComponent extends React.Component<any, any> {
    render() {
      if (!this.props.isAuth) return <Redirect to={"/login"} />;
      return <Component {...(this.props as T)} />;
    }
  }

  let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedRedirectComponent;
}
