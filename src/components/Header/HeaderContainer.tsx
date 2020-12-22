import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {logout, setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component<any, any> {


    componentDidMount() {
        this.props.setAuthUserData();
    }


    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: any) => ({
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps,{setAuthUserData, logout})(HeaderContainer);