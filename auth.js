import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Register User

window.registerUser = async function(){

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;


try{

await createUserWithEmailAndPassword(
auth,
email,
password
);


alert("Account Created Successfully!");

window.location.href="dashboard.html";


}

catch(error){

alert(error.message);

}

};




// Login User

window.loginUser = async function(){

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;


try{

await signInWithEmailAndPassword(
auth,
email,
password
);


alert("Login Successful!");

window.location.href="dashboard.html";


}

catch(error){

alert(error.message);

}

};




// Logout

window.logoutUser = async function(){


await signOut(auth);


window.location.href="login.html";


};
