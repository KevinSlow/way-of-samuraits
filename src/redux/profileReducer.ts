const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
    posts: [
        {id: 1, message: "Hi", likesCount: 10},
        {id: 2, message: "How is your day?", likesCount: 20},
        {id: 3, message: "Fine, tahnks", likesCount: 0},
        {id: 4, message: "Svetlana", likesCount: 50},
        {id: 5, message: "Trysa", likesCount: 100},
        {id: 6, message: "Fine", likesCount: 3}
    ],
    newPostText: "it-kamasutra.com!"
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
    type: 'ADD-POST';
    newText: string
}

interface ActionB {
    type: 'UPDATE-NEW-POST-TEXT';
    newText: string
}

export type Action = ActionA | ActionB ;




const profileReducer = (state = initialState, action: Action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state}
            stateCopy.posts = {...state.posts}
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = (action.newText);
            return stateCopy
        }
    }

    return state;
}

export const addPostActionCreator = () => ({
    type:ADD_POST,
});

export const updateNewPostTextActionCreator = (text: string) => ({
    type:UPDATE_NEW_POST_TEXT,
    newText: text,
});


export default profileReducer;