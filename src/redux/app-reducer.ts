import {setAuthUserData} from "./auth-reducer";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";


let initialState = {
    initialized: false
}


const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
    }
    return state;
}

export const initializedSuccess = () => ({
    type: SET_INITIALIZED_SUCCESS,
});


export const initializeApp = () => {

    return (dispatch: any) => {
        let promise = dispatch(setAuthUserData());
        Promise.all([promise])
            .then( () => {
                dispatch(initializedSuccess())
            })
    }
}


export default appReducer;