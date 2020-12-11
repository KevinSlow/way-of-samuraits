import React from "react";
import s from './Nav.module.css';
import {NavLink} from "react-router-dom";
import store from "../../redux/store";


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


const  Nav  = () => {

    let state = store.getState().sideBar;

    let friendsMessages = state.friends.map((f: FriendsType) => (
        <div className={s.friendsBlock}>
            <img className={s.friendsImg} src={f.imgUrl} alt="friends"/>
            <NavLink to={"/profile/" + f.id}><p>{f.name}</p></NavLink>
        </div>
    ));

        return (
            <div>
                <nav className={s.nav}>
                    <div className={`${s.item}`}><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
                    </div>
                    <div className={s.item}><NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink></div>
                    <div className={s.item}><NavLink to="/news" activeClassName={s.active}>News</NavLink></div>
                    <div className={s.item}><NavLink to="/music" activeClassName={s.active}>Music</NavLink></div>
                    <div className={s.item}><NavLink to="/settings" activeClassName={s.active}>Settings</NavLink></div>
                    <div className={s.item}><NavLink to="/users" activeClassName={s.active}>Users</NavLink></div>
                    <div className={s.friendsBlocks}>
                        {friendsMessages}
                    </div>
                </nav>
            </div>
        );
    }




export default Nav;