import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, setUserProfile, updateStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import { compose } from "redux";


export class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 12480;
        }
        this.props.setUserProfile(userId);
            this.props.getStatus(userId)

    }


    render() {
        debugger
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    }
}



let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});


export default compose<any>(
    connect(mapStateToProps, {setUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)