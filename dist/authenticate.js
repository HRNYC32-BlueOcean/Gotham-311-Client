/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-undef */
(function () {
  require('dotenv').config();
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.messagingSenderId,
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  const apiURL = process.env.API_URL;
  const createUserMutation = function (firstName, lastName, email) {
    return `mutation {
        createUser(
          first_name: "${firstName}"
          last_name: "${lastName}"
          email: "${email}"
          phone: "''"
        ){
          id
        }
      }`;
  };

  const uiConfig = {
    callbacks: {
      // This method runs upon a successful login
      signInSuccessWithAuthResult: function (authResult) {
        console.log(authResult);
        let idToken = null;
        const userInfo = authResult.user;
        const newUser = authResult.additionalUserInfo.isNewUser;
        console.log(authResult, authResult.user);
        window.localStorage.setItem('GothamEmail', userInfo.email);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((id) => {
            // this is the JWT!
            idToken = id;
            console.log(idToken);
            return axios.post('/cookie', { idToken });
          })
          .then((cookie) => {
            if (newUser) {
              console.log('new user!');
              const firstName = userInfo.displayName.split(' ')[0];
              const lastName = userInfo.displayName.split(' ')[1];
              const queryString = createUserMutation(firstName, lastName, userInfo.email);
              console.log(queryString);
              return axios.post(apiURL, {
                query: queryString,
              });
            }
          })
          .then((response) => {
            if (response) {
              const userId = response.data.data.createUser.id;
              console.log('userId', userId);
            }
            location.href = '/';
            console.log('routed');
          })
          .catch(function (error) {
            console.log('LOGIN FLOW ERROR', error);
          });
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle. (developer handles on false)
        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // signInSuccessUrl: '/routes/redirect',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  }; //end ui config

  //start auth
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
})();
