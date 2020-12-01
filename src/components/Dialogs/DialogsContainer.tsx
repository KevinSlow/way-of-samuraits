import React from "react";
import {
    addDialogActionCreator,
    updateNewDialogTextActionCreator
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {RootStoreType} from "../../redux/store";

import {connect} from "react-redux";

type dialogsContainerPropsType = {
    store: RootStoreType
};

const mapStateToProps = (state: any) => {
    return{
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return{
        sendMessage: () => {
            dispatch(addDialogActionCreator());
        },
        updateNewMessageBody: (text:string)=>{
           dispatch(updateNewDialogTextActionCreator(text));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);



export default DialogsContainer;