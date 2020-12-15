import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";






export class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.setUserProfile(this.props.match.params.userId);
    }


    render() {
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