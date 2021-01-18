import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { StateType } from "../../types/types";

class HeaderContainer extends React.Component<any, any> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: StateType) => ({
  userId: state.auth.userId,
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
