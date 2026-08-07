import { auth, db } from "./firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

GoogleAuthProvider,

FacebookAuthProvider,

signInWithPopup

} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

doc,

setDoc

} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// Create Account

window.registerUser = async function(){


const name = document.getElementById("name").value;

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;

const confirmPassword = document.getElementById("confirmPassword").value;



if(password !== confirmPassword){

alert("Password does not match");

return;

}



try{


const userCredential = await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = userCredential.user;



await setDoc(doc(db,"users",user.uid),{


name:name,

email:email,

createdAt:new Date()


});



alert("Account Created Successfully!");


window.location.href="dashboard.html";


}



catch(error){

alert(error.message);

}


};
