import React, { ChangeEvent, Props } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItems";
import Message from "./Message/Message";
import { DialogPageType } from "../../redux/_store";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  CreateField,
  MyInput,
  TextArea,
} from "../Common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/Validators/validators";
import { InitialStateType } from "../../redux/dialogsReducer";
import { Redirect } from "react-router-dom";
import { Button } from "antd";

type StatePropsType = {
  dialogsPage: DialogPageType;
  addDialogAction: (newMessageBody: string) => void;
  updateNewMessageBody: (text: string) => void;
  isAuth: boolean;
};

type DialogPropsType = {
  dialogs: Array<DialogsItemsType>;
  messages: Array<MessagesItemsType>;
};
type DialogsItemsType = {
  name: string;
  id: number;
};

type MessagesItemsType = {
  message: string;
};

const maxLength = maxLengthCreator(100);

type OwnPropsType = {
  dialogsPage: InitialStateType;
  addDialogAction: (newMessageBody: string) => void;
};
export type NewMessageFormValuesType = {
  newMessageBody: string;
};
type PropsType = {};
type NewMessageValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>;

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let state = props.dialogsPage;

  let dialogElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  const addNewMessage = (values: { newMessageBody: string }) => {
    console.log(values);
    props.addDialogAction(values.newMessageBody);
  };

  return (
    <div>
      <div className={s.chatBlocks}>
        <div className={s.chatFirst}>{dialogElements}</div>
        <div className={s.chatSecond}>
          <ul className={s.chatThread}>{messagesElements}</ul>
          <ReduxMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};
const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <div className="write">
      <form onSubmit={props.handleSubmit}>
        {CreateField<NewMessageValuesTypeKeys>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength],
          TextArea,
          { type: "text" }
        )}
        <Button htmlType={"submit"}>Button</Button>
      </form>
    </div>
  );
};

const ReduxMessageForm = reduxForm<NewMessageFormValuesType & PropsType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);

export default Dialogs;
