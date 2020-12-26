import dialogsReducer, {addDialogActionCreator, deleteDialog} from "./dialogsReducer";


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
    ]
}
test('deleting messages ', () => {
    // 1. Test Data
    let action = deleteDialog(1);
    /// 2. Action
    let newState = dialogsReducer(initialState, action)
    /// 3. Expectation
    expect(newState.dialogs.length).toBe(5);
});
test('add messages ', () => {
    // 1. Test Data
    let action = addDialogActionCreator("New Message");
    /// 2. Action
    let newState = dialogsReducer(initialState, action)
    /// 3. Expectation
    expect(newState.messages.length).toBe(7);
});