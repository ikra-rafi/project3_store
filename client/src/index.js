import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {TodoProvider} from "./utils/store";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const app = (
    <TodoProvider>
      <App />
    </TodoProvider>
  );
  
  ReactDOM.render(app, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById("root"));
