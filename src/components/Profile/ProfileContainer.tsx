import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  savePhoto,
  saveProfile,
  setUserProfile,
  updateStatus,
} from "../../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  DispatchType,
  ProfileType,
  StateType,
  UserType,
} from "../../types/types";

type MapStateToPropsType = {
  authorizedUserId: number | null;
  status: string;
  profile: ProfileType | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setUserProfile: (userId: number | null) => void;
  getStatus: (userId: number) => void;
  savePhoto: () => void;
  updateStatus: () => void;
  saveProfile: () => void;
};

type OwnPropsType = {};

export type ProfileContainerType = MapStateToPropsType &
  MapDispatchPropsType &
  OwnPropsType;

class ProfileContainer extends React.Component<
  StateType &
    ProfileContainerType &
    DispatchType &
    RouteComponentProps<{ userId: string }>
> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.setUserProfile(userId);
    if (typeof userId === "number") {
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        saveProfile={this.props.saveProfile}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state: StateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose<any>(
  connect<MapStateToPropsType, OwnPropsType, MapDispatchPropsType, StateType>(
    mapStateToProps,
    {
      setUserProfile,
      getStatus,
      updateStatus,
      savePhoto,
      saveProfile,
    }
  ),
  withRouter
)(ProfileContainer);
