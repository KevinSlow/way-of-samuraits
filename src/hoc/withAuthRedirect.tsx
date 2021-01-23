import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { StateType } from "../types/types";

let mapStateToPropsForRedirect = (state: StateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStateToPropsType = {
  isAuth: boolean;
};

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) return <Redirect to={"/login"} />;

    return <WrappedComponent {...((restProps as unknown) as WCP)} />;
  };

  let ConnectedRedirectComponent = connect<
    MapStateToPropsType,
    {},
    WCP,
    StateType
  >(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedRedirectComponent;
}
