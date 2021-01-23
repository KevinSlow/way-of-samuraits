import React, { ComponentType } from "react";
import Dialogs from "./Dialogs";

import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { StateType } from "../../types/types";
import { actions } from "../../redux/dialogsReducer";

const mapStateToProps = (state: StateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
