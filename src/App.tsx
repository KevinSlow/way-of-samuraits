import React from "react";

import './App.css';

import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from "react-router-dom";
import {RootStateType, RootStoreType} from "./redux/state";


type AppPropsType = {
    store: RootStoreType
    state: RootStateType,
    dispatch: (action: any) => void
}

const App = (props: AppPropsType) => { 
    return (
        <div className="app-wrapper">
            <Header/>
            <Nav state={props.state.sideBar}/>
            <div className="app-wrapper-content">
                <Route exact render={() => (<Dialogs
                   store={props.store}
                />)}
                       path="/dialogs"/>
                <Route exact render={() => (<Profile
                    state={props.state.profilePage}
                    dispatch={props.dispatch}
                />)}
                       path="/profile"

                />
                <Route exact component={News} path="/news"/>
                <Route exact component={Music} path="/music"/>
                <Route exact component={Settings} path="/settings"/>
            </div>
        </div>

    );
}


export default App;


