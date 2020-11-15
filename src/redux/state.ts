import {reRenderEntireTree} from "../render";

type MessageType = {
    id: number,
    message: string
}
type DialogType = {
    id: number,
    name: string
}

type PostType = {
    id: number,
    message: string,
    likesCount: number
}

type sideBar = {
    id: number,
    name: string,
    imgUrl: string
}

type ProfilePageType = {
    posts: Array<PostType>
}

type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
};

type SideBarType = {
    friends: Array<sideBar>
};

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
    sideBar: SideBarType
}





let state:RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi", likesCount: 10},
            {id: 2, message: "How is your day?", likesCount: 20},
            {id: 3, message: "Fine, tahnks", likesCount: 0},
            {id: 4, message: "Svetlana", likesCount: 50},
            {id: 5, message: "Trysa", likesCount: 100},
            {id: 6, message: "Fine", likesCount: 3}
        ],
    },
    dialogsPage: {
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
    },
    sideBar: {
        friends: [
            {id: 1, name: "Kiril", imgUrl: "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg"},
            {id: 2, name: "Ivan", imgUrl: "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg"},
            {
                id: 3,
                name: "Petrovich",
                imgUrl: "https://thatshelf.com/wp-content/uploads/2020/08/ava-jessica-chastain.jpg"
            },
        ],
    },
};


export let addPost = (postMessage: string) => {
    debugger
    let newPosts = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };

    state.profilePage.posts.push(newPosts);
    reRenderEntireTree(state);
}


export default state;