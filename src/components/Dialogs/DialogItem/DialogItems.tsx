import React from "react";
import s from './DialogItems.module.css';
import {NavLink} from "react-router-dom";


type DialogItemPropsType = {
    id: number,
    name: string
}

const DialogItem = (props: DialogItemPropsType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    );
}

export default DialogItem;