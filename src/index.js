import React from 'react';
import ReactDOM from 'react-dom';
require('dotenv').config();
import App from './App';
import './styles.scss';
import axios from 'axios';
import Banned from './banned';

const api_url = process.env.api_url;
let email = window.localStorage.getItem('GothamEmail');
axios({
  url: api_url,
  method: 'post',
  data: {
    query: `{
          getUser(email:"${email}") {
            id
            first_name
            points
            banned
            issues {
              id
              title
              description
              create_date
              photo_url
              borough{
                name
              }
              resolution_status{
                name
              }
            }
          }
        }`,
  },
})
  .then((res) => {
    let data = res.data.data.getUser[0];
    if (data.banned) {
      var mountNode = document.getElementById('app');
      ReactDOM.render(<Banned user={data.first_name} />, mountNode);
    } else {
      var mountNode = document.getElementById('app');
      ReactDOM.render(<App userData={data} email={email} />, mountNode);
    }
  })
  .catch((err) => console.log(err));
