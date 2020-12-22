import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload,
            }
    }


    return state;
}

export const setAuthUserDataSuccess = (userId: any, email: any, login: any, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});


export const setAuthUserData = () => {
    return (dispatch: any) => {
        authAPI.me()
            .then((data) => {
                if (data.resultCode === 0) {
                    let {email, id, login} = data.data;
                    dispatch(setAuthUserDataSuccess(email, id, login, true));
                }
            })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataSuccess(email, password, rememberMe, true))
            }
        })
}

export const logout = () => (dispatch: any) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataSuccess(null,null,null,false))
            }
        })
}
//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )


export default authReducer;