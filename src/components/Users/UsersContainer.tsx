import React from "react";
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage, setFollowingProgress,
    unfollow
} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";
import PreLoader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";



class UsersContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize);
    }

    onPageChanged = (pageNumber: any) => {
        this.props.getUsers(pageNumber,this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ?
                <PreLoader/>
                :   <Users totalUserCount={this.props.totalUserCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           users={this.props.users}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           followingInProgress={this.props.followingInProgress}
                />
            }
        </>
    }
}


let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



export default compose<any>(
    withAuthRedirect,
    connect(mapStateToProps,{follow, unfollow, setCurrentPage, setFollowingProgress, getUsers}),
)(UsersContainer)