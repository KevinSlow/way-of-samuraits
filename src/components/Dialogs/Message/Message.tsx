import React from "react";
import s from '../Dialogs.module.css';

type MessagePropsType = {
    message: string,
}


const Message = (props: MessagePropsType) => {
    return (

            <li>{props.message}</li>
    );
}


export default Message;