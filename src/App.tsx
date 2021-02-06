import React, { ComponentType, Suspense } from "react";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./App.css";
import "antd/dist/antd.css";
import Nav from "./components/Navbar/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import PreLoader from "./components/Common/Preloader/Preloader";
import store, { StateType } from "./redux/reduxStore";
import { withSuspense } from "./hoc/withSuspense";

import { UsersContainer } from "./components/Users/UsersContainer";
import Layout, { Footer, Header } from "antd/lib/layout/layout";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Menu from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import Breadcrumb from "antd/lib/breadcrumb/Breadcrumb";
import s from "./components/Navbar/Nav.module.css";
import { Avatar, Col, Image, Row } from "antd";
import { AppHeader } from "./components/Header/Header";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const ChatPage = React.lazy(() => import("./pages/chat/chatPage"));
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const ChatPageSuspended = withSuspense(ChatPage);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  // catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
  //   alert("Some error occured");
  // };

  componentDidMount() {
    this.props.initializeApp();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  // componentWillUnmount() {
  //   window.removeEventListener(
  //     "unhandledrejection",
  //     this.catchAllUnhandledErrors
  //   );
  // }

  render() {
    if (!this.props.initialized) {
      return <PreLoader />;
    }

    return (
      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Nav />
      //   <div className="app-wrapper-content">
      //     <Switch>
      //       <Route exact render={() => <Redirect to={"/profile"} />} path="/" />
      //       <Route exact render={() => <SuspendedDialogs />} path="/dialogs" />
      //       <Route
      //         exact
      //         render={() => <SuspendedProfile />}
      //         path="/profile/:userId?"
      //       />
      //       <Route exact component={News} path="/news" />
      //       <Route exact component={Music} path="/music" />
      //       <Route exact component={Settings} path="/settings" />
      //       <Route
      //         exact
      //         render={() => <UsersContainer pageTitle={"Самураи"} />}
      //         path="/users"
      //       />
      //       <Route exact render={withSuspense(LoginPage)} path="/login" />
      //       <Route exact render={() => <div>404 Not Found</div>} path="*" />
      //     </Switch>
      //   </div>
      // </div>
      <Layout>
        <AppHeader />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["2"]}
                // defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1">
                    {" "}
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/dialogs">Messages</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    {" "}
                    <Link to="/developers">Developers</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    {" "}
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Developers"
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="subnav 3"
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {
                <Switch>
                  <Route
                    exact
                    render={() => <Redirect to={"/profile"} />}
                    path="/"
                  />
                  <Route
                    exact
                    render={() => <SuspendedDialogs />}
                    path="/dialogs"
                  />
                  <Route
                    exact
                    render={() => <SuspendedProfile />}
                    path="/profile/:userId?"
                  />
                  <Route exact component={News} path="/news" />
                  <Route exact component={Music} path="/music" />
                  <Route exact component={Settings} path="/settings" />
                  <Route exact component={ChatPageSuspended} path="/chat" />
                  <Route
                    exact
                    render={() => <UsersContainer pageTitle={"Самураи"} />}
                    path="/developers"
                  />
                  <Route exact render={withSuspense(LoginPage)} path="/login" />
                  <Route
                    exact
                    render={() => <div>404 Not Found</div>}
                    path="*"
                  />
                </Switch>
              }
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Social Network @2021</Footer>
      </Layout>
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
    <HashRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading... </div>}>
          <AppContainer />
        </Suspense>
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
