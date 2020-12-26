import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
import React, {createElement} from "react";
import ReactDOM from "react-dom";
import App from "../App";

const state = {
    posts: [
        {id: 1, message: "Hi", likesCount: 10},
        {id: 2, message: "How is your day?", likesCount: 20},
        {id: 3, message: "Fine, tahnks", likesCount: 0},
        {id: 4, message: "Svetlana", likesCount: 50},
    ],
    newPostText: "it-kamasutra.com!",
    profile: null,
    status: ""
}

test('after deleting messages,increment expected ', () => {
    // 1. Test Data

    let action = deletePost(1);

    /// 2. Action

    let newState = profileReducer(state, action)

    /// 3. Expectation

    expect(newState.posts.length).toBe(3);
});

test('Posts length should be incremented', () => {
    // 1. Test Data

    let action = addPostActionCreator("New Post");

    /// 2. Action

    let newState = profileReducer(state, action)

    /// 3. Expectation

    expect(newState.posts.length).toBe(5);
});


test('after deleting length shouldnt be decrement id ID is incorrect', () => {
    // 1. Test Data

    let action = deletePost(10000);

    /// 2. Action

    let newState = profileReducer(state, action)

    /// 3. Expectation

    expect(newState.posts.length).toBe(4);
});

