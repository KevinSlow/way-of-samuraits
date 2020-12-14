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
                ...action.data,
                isAuth: true
            }
    }


return state;
}

export const setAuthUserData = (userId: any,email: any,login: any) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
});

//
// export const setIsFetching = (isFetching: boolean) => (
//     {type: TOGGLE_IS_FETCHING, isFetching}
// )


export default authReducer;