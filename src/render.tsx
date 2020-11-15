import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { addPost } from './redux/state';





export let reRenderEntireTree = (state: any) => { /////???????????????????
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPosts={addPost} />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}