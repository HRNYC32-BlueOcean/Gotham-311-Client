import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';
import axios from 'axios';

const api_url = 'https://nameless-mountain-18450.herokuapp.com/';

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
    var mountNode = document.getElementById('app');
    ReactDOM.render(<App userData={res.data.data.getUser[0]} email={email}/>, mountNode);
  })
  .catch((err) => console.log(err));
