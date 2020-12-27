import React, { Suspense } from "react";

import './App.css';

import Nav from "./components/Navbar/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {RootStoreType} from "./redux/store";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import { compose } from "redux";
import {initializeApp} from "./redux/app-reducer";
import PreLoader from "./components/Common/Preloader/Preloader";
import store from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";
import User from "./components/Users/User";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

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
                    <Route exact render={(withSuspense(DialogsContainer))} path="/dialogs"/>
                    <Route exact render={(withSuspense(ProfileContainer))} path="/profile/:userId?"/>
                    <Route exact component={News} path="/news"/>
                    <Route exact component={Music} path="/music"/>
                    <Route exact component={Settings} path="/settings"/>
                    <Route exact render={(withSuspense(UsersContainer))} path="/users"/>
                    <Route exact render={withSuspense(LoginPage)} path="/login"/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})


let AppContainer = compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)


export const SamuraiJSApp = (props:any) => {
  return <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
}

export default SamuraiJSApp
