import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";
import axios from 'axios'
const api_url = 'https://nameless-mountain-18450.herokuapp.com/';


let email = window.localStorage.getItem('GothamEmail')
console.log(email)

// axios(
//   url: api_url,
//   method: 'post',
//   data: {
//     `{
//       getUser()
//     }`
//   }
// )
var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);