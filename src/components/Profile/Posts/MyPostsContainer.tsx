import React from "react";
import {addPostActionCreator} from "../../../redux/profileReducer";
import {RootStoreType} from "../../../redux/store";
import {connect} from "react-redux";
import Profile from "../Profile";
import MyPosts from "./MyPosts";


type myPostsContainerPropsType = {
    store: RootStoreType
};


const mapStateToProps = (state: any) => {
    return{
        post: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any,) => {
    return{
        addPosts: (newPostText:string) => {
            dispatch(addPostActionCreator(newPostText));
        },

    }
}


const MyPostsContainer: any = connect(mapStateToProps, mapDispatchToProps)(MyPosts);




export default MyPostsContainer;