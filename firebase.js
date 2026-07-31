import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyByZP0D_jKYOitPhOunqn44Z1FMNFF40tc",

authDomain: "fraudguard-eafd2.firebaseapp.com",

projectId: "fraudguard-eafd2",

storageBucket: "fraudguard-eafd2.firebasestorage.app",

messagingSenderId: "721145048132",

appId: "1:721145048132:web:c87c07d58d8e9b5b806011"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export {

auth,

db

};
Eituk ee hobe firebase ee
