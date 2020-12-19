import {profileAPI, usersAPI} from "../api/api";
import {setIsFetching, setTotalUserCount, setUsers} from "./usersReducer";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
    posts: [
        {id: 1, message: "Hi", likesCount: 10},
        {id: 2, message: "How is your day?", likesCount: 20},
        {id: 3, message: "Fine, tahnks", likesCount: 0},
        {id: 4, message: "Svetlana", likesCount: 50},
        {id: 5, message: "Trysa", likesCount: 100},
        {id: 6, message: "Fine", likesCount: 3}
    ],
    newPostText: "it-kamasutra.com!",
    profile: null,
    status: ""
}

type profileReducerType = {
    newPostText: string,
    posts: Array<PostType>,
}


type PostType = {
    id: number,
    message: string,
    likesCount: number
}

interface ActionA {
    type: 'ADD-POST';
    newText: string
}

interface ActionB {
    type: 'UPDATE-NEW-POST-TEXT';
    newText: string
}

interface ActionC {
    type: 'SET_USER_PROFILE';
    profile: any
}

export type Action = ActionA | ActionB | ActionC;


const profileReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
    }

    return state;
}

export const addPostActionCreator = (newPostText:string) => ({
    type: ADD_POST,
    newPostText
});


export const setUserProfileSuccess = (profile: any) => ({
    type: SET_USER_PROFILE,
    profile,
});
export const setUserProfile = (userId: number) => {
    return (dispatch: any) => {
        usersAPI.getUsersProfile(userId)
            .then((response) => {
                dispatch(setUserProfileSuccess(response.data));
            })
    }
};
export const setStatus = (status: any) => ({
    type: SET_STATUS,
    status,
});
export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then((response) => {
            dispatch(setStatus(response.data));
        })
};

export const updateStatus = (status: number) => (dispatch: any) => {
    debugger
    profileAPI.updateStatus(status)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
};


export default profileReducer;