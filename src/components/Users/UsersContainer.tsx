import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage, setFollowingProgress,
    setIsFetching,
    setTotalUserCount,
    setUsers,
    unfollow
} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";
import PreLoader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";



class UsersContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
            .then((data) => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUserCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber: any) => {
        this.props.setIsFetching(true);
        usersAPI.getUsers(pageNumber,this.props.pageSize)
            .then((data) => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
            })
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
                           setFollowingProgress={this.props.setFollowingProgress}
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




export default connect(mapStateToProps,{
    follow, unfollow, setUsers, setCurrentPage, setTotalUserCount, setIsFetching, setFollowingProgress
})(UsersContainer)