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
import {RootStateType, RootStoreType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


type AppPropsType = {
    store: RootStoreType
}

const App = () => {

    return (
        <div className="app-wrapper">
            <Header/>
            <Nav/>
            <div className="app-wrapper-content">
                <Route exact render={() => (<DialogsContainer

                />)}
                       path="/dialogs"/>
                <Route exact render={() => (<Profile

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


