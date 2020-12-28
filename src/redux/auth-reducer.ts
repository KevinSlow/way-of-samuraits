import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";


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


export const setAuthUserData = () => async (dispatch: any) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        let {email, id, login} = data.data;
        dispatch(setAuthUserDataSuccess(id, email, login, true));
    }

}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataSuccess(email, password, rememberMe, true))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
        dispatch(stopSubmit("login", {_error: message}));
    }

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataSuccess(null, null, null, false))
            }
}
//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )


export default authReducer;