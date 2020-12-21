import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItems";
import Message from "./Message/Message";
import {DialogPageType} from "../../redux/store";
import {Field, reduxForm} from "redux-form";
import TextArea from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/Validators/validators";


type StatePropsType = {
    dialogsPage: DialogPageType
    sendMessage: (newMessageBody: string) => void,
    updateNewMessageBody: (text: string) => void,
    isAuth: boolean
};

type DialogPropsType = {
    dialogs: Array<DialogsItemsType>,
    messages: Array<MessagesItemsType>,

}
type DialogsItemsType = {
    name: string,
    id: number,
}

type MessagesItemsType = {
    message: string,

}



const maxLength = maxLengthCreator(100);

const Dialogs = (props: StatePropsType) => {

    let state = props.dialogsPage;


    let dialogElements = state.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = state.messages.map((m) => (
        <Message key={m.id} message={m.message}/>
    ))


    const addNewMessage = (values: any) => {
        console.log(values)
        props.sendMessage(values.newMessageBody);
    }


    return (
        <div>
            <div className={s.chatBlocks}>
                <div className={s.chatFirst}>
                    {dialogElements}
                </div>
                <div className={s.chatSecond}>
                    <ul className={s.chatThread}>
                        {messagesElements}
                    </ul>
                    <ReduxMessageForm onSubmit={addNewMessage}/>
                </div>
            </div>

        </div>
    )
};

const AddMessageForm = (props: any) => {
    return (
        <div className="write">
            <form onSubmit={props.handleSubmit}>
                <Field component={TextArea} validate={[required, maxLength]} name={"newMessageBody"}  placeholder={"Enter your message"}/>
                <button  className={s.send}></button>
            </form>
        </div>
    )
}

const ReduxMessageForm = reduxForm({
    form: "dialogAddMessageForm"
})(AddMessageForm)


export default Dialogs;