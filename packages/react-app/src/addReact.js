import React from "react";
import ReactDOM from "react-dom";
import {Counter} from './Counter'
import "./index.css";

// const App = () => (
//   <div className="container">
//     <Counter />
//   </div>
// );

export default function addReact(el){
    ReactDOM.render(<Counter />, el);
}