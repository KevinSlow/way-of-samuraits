import React from "react";
import s from './Nav.module.css';
import {NavLink} from "react-router-dom";


type NavStateType = {
    state: NavPropsType
}

type NavPropsType = {
    friends: Array<FriendsType>
}

type FriendsType = {
    id: number,
    name: string,
    imgUrl: string
}


const Nav = (props: NavStateType) => {

    let friendsMessages = props.state.friends.map((f) => (
        <div className={s.friendsBlock}>
            <img className={s.friendsImg} src={f.imgUrl} alt="friends"/>
            <NavLink to={"/dialogs/" + f.id}><p>{f.name}</p></NavLink>
        </div>
    ));

    return (
        <div>
            <nav className={s.nav}>
                <div className={`${s.item}`}><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink></div>
                <div className={s.item}><NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink></div>
                <div className={s.item}><NavLink to="/news" activeClassName={s.active}>News</NavLink></div>
                <div className={s.item}><NavLink to="/music" activeClassName={s.active}>Music</NavLink></div>
                <div className={s.item}><NavLink to="/settings" activeClassName={s.active}>Settings</NavLink></div>
                <div className={s.friendsBlocks}>
                    {friendsMessages}
                </div>
            </nav>

        </div>
    );
}

export default Nav;