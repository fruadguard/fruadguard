// ===============================
// FraudGuard Firebase Setup
// Production Version
// ===============================



import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {

getAuth,

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





import {

getFirestore,

doc,

setDoc,

getDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";








// ===============================
// Firebase Configuration
// ===============================



const firebaseConfig = {


apiKey: "YOUR_API_KEY",


authDomain: "YOUR_PROJECT.firebaseapp.com",


projectId: "YOUR_PROJECT_ID",


storageBucket: "YOUR_PROJECT.appspot.com",


messagingSenderId: "YOUR_SENDER_ID",


appId: "YOUR_APP_ID"


};








// Initialize Firebase


const app = initializeApp(firebaseConfig);




const auth = getAuth(app);



const db = getFirestore(app);









// ===============================
// Register User
// ===============================



export async function registerUser(
email,
password,
name
){


const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user =
userCredential.user;





await setDoc(

doc(
db,
"users",
user.uid
),

{


name:name,


email:user.email,


role:"user",


plan:"free",


subscriptionStatus:"inactive",


createdAt:new Date()



}


);





return user;



}









// ===============================
// Login User
// ===============================



export async function loginUser(

email,

password

){



const result =

await signInWithEmailAndPassword(

auth,

email,

password

);



return result.user;



}









// ===============================
// Logout
// ===============================



export async function logoutUser(){


await signOut(auth);


}









// ===============================
// Check User
// ===============================



export function checkUser(callback){


onAuthStateChanged(

auth,

(user)=>{


callback(user);


}

);


}









// ===============================
// Get User Data
// ===============================



export async function getUserData(uid){



const userDoc =

await getDoc(

doc(

db,

"users",

uid

)

);





if(userDoc.exists()){


return userDoc.data();


}



return null;



}









// ===============================
// Get User Role
// ===============================



export async function getUserRole(uid){



const data =

await getUserData(uid);



if(data){


return data.role;


}



return null;



}
// ===============================
// Get All Users (Admin Ready)
// ===============================


import {

collection,
getDocs

}

from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




export async function getAllUsers(){


const users = [];



const snapshot =

await getDocs(
collection(db,"users")
);



snapshot.forEach((doc)=>{


users.push({

id:doc.id,

...doc.data()

});


});



return users;



}

