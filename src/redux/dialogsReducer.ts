const ADD_DIALOG = "ADD-DIALOG";
const DELETE_DIALOG = "DELETE_DIALOG";

const initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your day?" },
    { id: 3, message: "Fine, tahnks" },
    { id: 4, message: "Svetlana" },
    { id: 5, message: "Trysa" },
    { id: 6, message: "Fine" },
  ],
  dialogs: [
    { id: 1, name: "Dimich123" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Valera" },
    { id: 4, name: "Sveta" },
    { id: 5, name: "Polina" },
    { id: 6, name: "Sasha" },
  ],
};

interface ActionA {
  type: "ADD-DIALOG";
  newMessageBody: string;
}

interface ActionB {
  type: "UPDATE-NEW-DIALOG-TEXT";
  newDialogText: string;
}
type ActionC = {
  type: "DELETE_DIALOG";
  dialogId: number;
};
type dialogsReducerType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  newDialogText: string;
};

type MessageType = {
  id: number;
  message: string;
};
type DialogType = {
  id: number;
  name: string;
};

export type ActionType = ActionA | ActionB | ActionC;

const dialogsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DIALOG: {
      let newDialogText = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: newDialogText }],
      };
    }
    case DELETE_DIALOG: {
      return {
        ...state,
        dialogs: state.dialogs.filter((p) => p.id !== action.dialogId),
      };
    }
    default:
      return state;
  }
};

export const addDialogActionCreator = (newMessageBody: string) => ({
  type: ADD_DIALOG,
  newMessageBody,
});

export const deleteDialog = (dialogId: number) => ({
  type: DELETE_DIALOG,
  dialogId,
});

export default dialogsReducer;
