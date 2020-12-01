const UPDATE_NEW_DIALOG_TEXT = "UPDATE-NEW-DIALOG-TEXT";
const ADD_DIALOG = "ADD-DIALOG";

const initialState = {
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your day?"},
        {id: 3, message: "Fine, tahnks"},
        {id: 4, message: "Svetlana"},
        {id: 5, message: "Trysa"},
        {id: 6, message: "Fine"}
    ],

    dialogs: [
        {id: 1, name: "Dimich123"},
        {id: 2, name: "Andrew"},
        {id: 3, name: "Valera"},
        {id: 4, name: "Sveta"},
        {id: 5, name: "Polina"},
        {id: 6, name: "Sasha"}
    ],
    newDialogText:  "it-kamasutra.com!"
}

interface ActionA {
    type: 'ADD-DIALOG';
    newDialogText: string
}

interface ActionB {
    type: 'UPDATE-NEW-DIALOG-TEXT';
    newDialogText: string
}

type dialogsReducerType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    newDialogText: string
};

type MessageType = {
    id: number,
    message: string
}
type DialogType = {
    id: number,
    name: string
}


export type ActionType = ActionA | ActionB;


const dialogsReducer = (state = initialState, action: ActionType) => {
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