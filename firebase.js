// =============================
// FRAUDGUARD FIREBASE CONFIG
// =============================



import { initializeApp } 
from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";



import { 

getAuth 

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";



import {

getFirestore

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





// Your Firebase Config


const firebaseConfig = {


apiKey: "AIzaSyCNK3tHXMTS_-mu8IAHW9q7hgo4TkBGuSs",
authDomain: "fraudguard-eafd2.firebaseapp.com",


projectId:"fraudguard-eafd2",
storageBucket:"fraudguard-eafd2.firebasestorage.app",
messagingSenderId:"721145048132",


appId:"1:721145048132:web:c87c07d58d8e9b5b806011"


};







// Initialize Firebase


const app = initializeApp(firebaseConfig);





// Authentication


const auth = getAuth(app);





// Firestore Database


const db = getFirestore(app);







export { auth, db };
// =============================
// FIREBASE STORAGE
// =============================


import {

getStorage

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";




// Storage Setup

const storage = getStorage(app);





// Export All


export {


auth,

db,

storage

};

