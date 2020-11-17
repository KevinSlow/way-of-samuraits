import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItems";
import Message from "./Message/Message";

type StatePropsType = {
    state: DialogPropsType
};

type DialogPropsType = {
    dialogs: Array<DialogsItemsType>,
    messages: Array<MessagesItemsType>
}
type DialogsItemsType = {
    name: string,
    id: number,
}

type MessagesItemsType = {
    message: string
}

const Dialogs = (props: StatePropsType) => {

    let dialogElements = props.state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = props.state.messages.map((m) => (
        <Message message={m.message}/>
    ))



    let newDialogElement: any = React.createRef();  //////???????????

    let newDialog = () => {
        let txt = newDialogElement.current.value;
        alert(txt)
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
                        <textarea ref={newDialogElement}/>
                        <button type="button" onClick={newDialog} className={s.send}></button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Dialogs;