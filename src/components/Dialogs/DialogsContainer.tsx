import React from "react";
import { addDialogActionCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { RootStoreType } from "../../redux/store";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type dialogsContainerPropsType = {
  store: RootStoreType;
};

const mapStateToProps = (state: any) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (newMessageBody: string) => {
      dispatch(addDialogActionCreator(newMessageBody));
    },
  };
};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
