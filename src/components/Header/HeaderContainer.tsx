import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component<any, any> {


    componentDidMount() {
        usersAPI.getHeader()
            .then((data) => {
                debugger
               if(data.resultCode === 0) {
                   let {email, id, login} = data.data;
                   this.props.setAuthUserData(email, id, login);
               }
            })
    }


    render() {
        debugger
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: any) => ({
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);