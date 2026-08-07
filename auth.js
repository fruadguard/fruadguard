import { auth, db } from "./firebase.js";

import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// LOGIN

window.loginUser = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;


if(!email || !password){

alert("Enter email and password");

return;

}


try{


const userCredential = await signInWithEmailAndPassword(
auth,
email,
password
);


alert("Login Successful");


window.location.href = "dashboard.html";


}

catch(error){

alert(error.message);

}


};





// REGISTER

window.registerUser = async function(){


const name = document.getElementById("name").value;

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;



try{


const userCredential = await createUserWithEmailAndPassword(
auth,
email,
password
);


const user = userCredential.user;



await setDoc(
doc(db,"users",user.uid),
{

name:name,

email:email,

createdAt:new Date()

}

);



alert("Account Created");


window.location.href="dashboard.html";


}

catch(error){

alert(error.message);

}


};





// GOOGLE LOGIN

window.googleLogin = async function(){


const provider = new GoogleAuthProvider();


try{


await signInWithPopup(auth, provider);


alert("Google Login Successful");


window.location.href="dashboard.html";


}

catch(error){

alert(error.message);

}


};





// LOGOUT

window.logoutUser = async function(){


await signOut(auth);


window.location.href="login.html";


};
