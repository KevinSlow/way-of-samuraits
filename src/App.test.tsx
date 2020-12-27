import React, {createElement} from 'react';
import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";

test('renders without crashing', () => {
  const div = createElement("div");
  // @ts-ignore
  ReactDOM.render(<SamuraiJSApp/>, div);
  // @ts-ignore
  ReactDOM.unmountComponentAtNode(div);
});
