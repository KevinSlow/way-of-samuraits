import React, { ComponentType } from "react";
import Dialogs from "./Dialogs";

import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

import { actions } from "../../redux/dialogsReducer";
import { StateType } from "../../redux/reduxStore";

const mapStateToProps = (state: StateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
