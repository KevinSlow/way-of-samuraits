import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Simulate} from "react-dom/test-utils";

const ADD_POST = "ADD-POST";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


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

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case SAVE_PHOTO_SUCCESS: {
            debugger
            //@ts-ignore
            return {...state, profile: {...state.profile, photos: action.photos}}
        }

    }
    return state;
}

export const addPostActionCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPostText
});


export const setUserProfileSuccess = (profile: any) => ({
    type: SET_USER_PROFILE,
    profile,
});

export const deletePost = (postId: number) => ({
    type: DELETE_POST,
    postId
});

export const setStatus = (status: any) => ({
    type: SET_STATUS,
    status,
});

export const savePhotoSuccess = (photos: any) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});

// -----------
// Redux-Thunk for async query
// -----------

export const setUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getUsersProfile(userId)
    dispatch(setUserProfileSuccess(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: number) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)

    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
};


export const saveProfile = (profile: any) => async (dispatch: any, getState:any) => {

    const userId =  getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {
        dispatch(setUserProfile(userId));
    }else{
        debugger
        // dispatch(stopSubmit("edit-profile", {"contacts" : {"facebook": response.messages[0]}}))
        dispatch(stopSubmit("edit-profile",{_error : response.messages[0]}))
        return Promise.reject(response.messages[0])
    }
};

export default profileReducer;