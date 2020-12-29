import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus,savePhoto, setUserProfile, updateStatus} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


export class ProfileContainer extends React.Component<any, any> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.setUserProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}
        />
    }
}


let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});


export default compose<any>(
    connect(mapStateToProps, {setUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
)(ProfileContainer)