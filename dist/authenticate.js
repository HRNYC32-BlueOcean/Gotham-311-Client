/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-undef */
(function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyDgQ_XKve5qbqGrBzIJUz68jZq1jdfc9wE',
    authDomain: 'blue-ocean-11c09.firebaseapp.com',
    databaseURL: 'https://blue-ocean-11c09.firebaseio.com',
    projectId: 'blue-ocean-11c09',
    storageBucket: 'blue-ocean-11c09.appspot.com',
    messagingSenderId: '1021824389353',
    appId: '1:1021824389353:web:1bcb46d710c7dd9c9b6078',
    measurementId: 'G-3XVR2PNR58',
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  const apiURL = 'https://nameless-mountain-18450.herokuapp.com/';
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
        const userInfo = authResult.additionalUserInfo.profile;
        const newUser = authResult.additionalUserInfo.isNewUser;
        window.localStorage.setItem('GothamEmail', userInfo.email);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((id) => {
            //this is the JWT!
            idToken = id;
            console.log(idToken);
            return axios.post('/cookie', { idToken });
          })
          .then((cookie) => {
            if (newUser) {
              console.log('new user!');
              const queryString = createUserMutation(
                userInfo.given_name,
                userInfo.family_name,
                userInfo.email
              );
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
            // location.href = '/';
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

  // firebase.auth().onAuthStateChanged(function (user) {
  //   console.log('AUTH STATE CHANGE');
  // });
})();
