import React, {createElement} from 'react';
import App from './App';
import ReactDOM from "react-dom";

test('renders learn react link', () => {
  const div = createElement("div");
  // @ts-ignore
  ReactDOM.render(<App/>, div);
  // @ts-ignore
  ReactDOM.unmountComponentAtNode(div);
});
