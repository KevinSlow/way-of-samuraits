import React from "react";

import './App.css';

import Nav from "./components/Navbar/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route, withRouter} from "react-router-dom";
import {RootStoreType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import {initializeApp} from "./redux/app-reducer";
import PreLoader from "./components/Common/Preloader/Preloader";


type AppPropsType = {
    store: RootStoreType
}

class App extends React.Component<any,any> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if(!this.props.initialized){
            return <PreLoader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Route exact render={() => (<DialogsContainer/>)} path="/dialogs"/>
                    <Route exact render={() => (<ProfileContainer/>)} path="/profile/:userId?"/>
                    <Route exact component={News} path="/news"/>
                    <Route exact component={Music} path="/music"/>
                    <Route exact component={Settings} path="/settings"/>
                    <Route exact render={() => (<UsersContainer/>)} path="/users"/>
                    <Route exact render={() => (<LoginPage/>)} path="/login"/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})


export default compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)


