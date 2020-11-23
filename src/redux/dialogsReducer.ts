const UPDATE_NEW_DIALOG_TEXT = "UPDATE-NEW-DIALOG-TEXT";
const ADD_DIALOG = "ADD-DIALOG";

const dialogsReducer = (state: any, action: any) => {
    switch (action.type) {
        case UPDATE_NEW_DIALOG_TEXT:
            state.newDialogText = (action.newDialogText);
            break;
        case ADD_DIALOG:
            let newDialogs = {
                id: 5,
                message: state.newDialogText,
            };
            state.newDialogText = '';
            state.messages.push(newDialogs);
            break;
    }
    return state;
}


export const addDialogActionCreator = () => ({
    type: ADD_DIALOG,
});

export const updateNewDialogTextActionCreator = (text: any) => ({
    type:UPDATE_NEW_DIALOG_TEXT,
    newDialogText: text,
});


export default dialogsReducer;