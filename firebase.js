// ============================================================
// FraudGuard - Firebase Configuration
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {

    apiKey: "AIzaSyByZP0D_jKYOitPhOunqn44Z1FMNFF40tc",

    authDomain: "fraudguard-eafd2.firebaseapp.com",

    databaseURL:
        "https://fraudguard-eafd2-default-rtdb.firebaseio.com",

    projectId: "fraudguard-eafd2",

    storageBucket:
        "fraudguard-eafd2.firebasestorage.app",

    messagingSenderId: "721145048132",

    appId:
        "1:721145048132:web:5b40a07526b47230806011",

    measurementId: "G-M32E57QXD1"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app =
    initializeApp(firebaseConfig);


// ============================================================
// AUTHENTICATION
// ============================================================

const auth =
    getAuth(app);


// ============================================================
// FIRESTORE
// ============================================================

const db =
    getFirestore(app);


// ============================================================
// EXPORT
// ============================================================

export {
    app,
    auth,
    db
};
