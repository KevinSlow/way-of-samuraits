import React,{Component} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostsContainer";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import Nav from "../Navbar/Nav";
import {usersAPI} from "../../api/api";





export class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
        usersAPI.getUsersProfile(userId)
            .then((data) => {
                this.props.setUserProfile(data)
            })
    }


    render() {
        // @ts-ignore
        return (
            <div>

                <Profile {...this.props} profile={this.props.profile}  />
            </div>
        );
    }
}

let mapStateToProps = (state:any) => ({
    profile: state.profilePage.profile
});



let withUrlDataContainerComponent = withRouter(ProfileContainer);


export default connect(mapStateToProps, {
    setUserProfile
})(withUrlDataContainerComponent);