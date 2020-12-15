import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
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
    type: 'FOLLOW';
    newText: string
}

interface ActionB {
    type: 'UNFOLLOW';
    newText: string
}

interface ActionC {
    type: 'SET_USERS';
    newText: string
}

interface ActionD {
    type: 'TOGGLE_IS_FETCHING';
    newText: string
}

export type Action = ActionA | ActionB | ActionC | ActionD;


const usersReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    // @ts-ignore
                    if (u.id === action.userId) {
                        // @ts-ignore
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    // @ts-ignore
                    if (u.id === action.userId) {
                        // @ts-ignore
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {...state, users: action.users}


        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUserCount: action.count}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
    }
    return state;
}

export const followSuccess = (userId: number) => ({
    type: FOLLOW,
    userId,
});

export const unfollowSuccess = (userId: number) => ({
    type: UNFOLLOW,
    userId
});

export const setUsers = (users: any) => ({
    type: SET_USERS,
    users
});

export const setCurrentPage = (currentPage: any) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
});

export const setTotalUserCount = (setTotalUserCount: any) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: setTotalUserCount
});

export const setIsFetching = (isFetching: boolean) => (
    {type: TOGGLE_IS_FETCHING, isFetching}
)

export const setFollowingProgress = (isFetching: boolean, userId: number) => (
    {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId}
)


export const getUsers = (currentPage:any,pageSize:any) => {
    return (dispatch: any) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then((data) => {
                dispatch(setIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUserCount(data.totalCount))
            })
    }
};



export const follow = (userId:number) => {

    return (dispatch: any) => {
        dispatch(setFollowingProgress(true, userId))
        usersAPI.followUsers(userId)
            .then((data) => {
                if(data.resultCode === 0){
                    dispatch(followSuccess(userId))
                }
                dispatch(setFollowingProgress(false, userId))
            })
    }

};

export const unfollow = (userId:number) => {
debugger
    return (dispatch: any) => {
        dispatch(setFollowingProgress(true, userId))
        usersAPI.unfollowUsers(userId)
            .then((data) => {
                if(data.resultCode === 0){
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(setFollowingProgress(false, userId))
            })
    }

};



export default usersReducer;