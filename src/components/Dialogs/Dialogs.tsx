import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItems";
import Message from "./Message/Message";
import {DialogPageType} from "../../redux/store";


type StatePropsType = {
    dialogsPage: DialogPageType
    sendMessage: () => void,
    updateNewMessageBody: (text: string) => void,
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
    message: string
}

const Dialogs = (props: StatePropsType) => {

    let state = props.dialogsPage;


    let dialogElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = state.messages.map((m) => (
        <Message message={m.message}/>
    ))


    let newDialogElement: any = React.createRef();

    let newDialog = () => {
        try {
            props.sendMessage();
        } catch (e) {
            alert('Ошибка ' + e.name + ":" + e.message);
        }
    }

    let onDialogChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;
        props.updateNewMessageBody(text)
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
                    <div className="write">
                        <textarea onChange={onDialogChange} ref={newDialogElement} value={state.newDialogText}/>
                        <button type="button" onClick={newDialog} className={s.send}></button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Dialogs;