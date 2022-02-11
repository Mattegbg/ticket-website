//const { isAsyncFunction } = require("utils/types");

//Skapa konto
const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const createButton = document.querySelector('#create-button');

//logga in
const loginUsername = document.querySelector(`#username-login`);
const loginPassword = document.querySelector(`#password-login`);
const loginButton = document.querySelector(`#login-button`);


//skapa konto.
async function createAccount (credentials) {
   const response = await fetch('http://localhost:5000/api/auth/create', {
       method: 'POST',
       body: JSON.stringify(credentials),
       headers: {
           'Content-Type': 'application/json'
       }
   });
   const data = await response.json();
   console.log(data);
}

function saveToken(token) {
    sessionStorage.setItem('token', token);

}

async function login(credentials) {
   const response = await fetch('http://localhost:5000/api/auth/login', {
       method: 'POST',
       body: JSON.stringify(credentials),
       headers: {
           'Content-Type': 'application/json'
       }
   });
   const data = await response.json();
   console.log(data);
   if (data.success) {
       // spara token i sessionStorage
       //Redirecta till http://localhost:5000/loggedIn.html
       saveToken(data.token);
       window.location.href = 'http://localhost:5000/loggedIn.html';

   }
}



loginButton.addEventListener('click', () => {
   const credentials = {
       username: loginUsername.value,
       password: loginPassword.value,
       
   }
   console.log(credentials)
   login(credentials);
});