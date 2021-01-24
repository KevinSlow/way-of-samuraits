import React, { ComponentType, Suspense } from "react";

import "./App.css";

import Nav from "./components/Navbar/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { RootStoreType } from "./redux/_store";

import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import PreLoader from "./components/Common/Preloader/Preloader";
import store, { StateType } from "./redux/reduxStore";
import { withSuspense } from "./hoc/withSuspense";

import Profile from "./components/Profile/Profile";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const UsersContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error Occurred");
    // console.error(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <PreLoader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact render={() => <Redirect to={"/profile"} />} path="/" />
            <Route exact render={() => <SuspendedDialogs />} path="/dialogs" />
            <Route
              exact
              render={() => <SuspendedProfile />}
              path="/profile/:userId?"
            />
            <Route exact component={News} path="/news" />
            <Route exact component={Music} path="/music" />
            <Route exact component={Settings} path="/settings" />
            <Route
              exact
              render={() => <UsersContainer pageTitle={"Самураи"} />}
              path="/users"
            />
            <Route exact render={withSuspense(LoginPage)} path="/login" />
            <Route exact render={() => <div>404 Not Found</div>} path="*" />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

export const SamuraiJSApp: React.FC = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading... </div>}>
          <AppContainer />
        </Suspense>
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
