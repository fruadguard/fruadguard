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


apiKey: "YOUR_API_KEY",


authDomain: "YOUR_PROJECT.firebaseapp.com",


projectId: "YOUR_PROJECT_ID",


storageBucket: "YOUR_PROJECT.appspot.com",


messagingSenderId: "YOUR_SENDER_ID",


appId: "YOUR_APP_ID"


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

