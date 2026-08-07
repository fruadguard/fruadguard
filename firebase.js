import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app);
export async function registerUser(email,password){

try{

const userCredential = await createUserWithEmailAndPassword(
auth,
email,
password
);

return userCredential.user;

}

catch(error){

console.log(error.message);

return null;

}

}



export async function loginUser(email,password){

try{

const userCredential = await signInWithEmailAndPassword(
auth,
email,
password
);

return userCredential.user;

}

catch(error){

console.log(error.message);

return null;

}

}



export async function logoutUser(){

try{

await signOut(auth);

return true;

}

catch(error){

console.log(error.message);

return false;

}

}
export async function submitReport(reportData){

try{

const docRef = await addDoc(
collection(db,"reports"),
{

name:reportData.name,

email:reportData.email,

type:reportData.type,

target:reportData.target,

details:reportData.details,

status:"Pending",

createdAt:new Date()

}

);


return docRef.id;


}

catch(error){

console.log(error.message);

return null;

}

}



export async function getReports(){

try{

const snapshot = await getDocs(
collection(db,"reports")
);


let reports=[];


snapshot.forEach((doc)=>{

reports.push({

id:doc.id,

...doc.data()

});

});


return reports;


}

catch(error){

console.log(error.message);

return [];

}

}
export async function saveScanHistory(data){

try{

const docRef = await addDoc(
collection(db,"scan_history"),
{

url:data.url,

risk:data.risk,

result:data.result,

user:data.user || "Guest",

createdAt:new Date()

}

);


return docRef.id;


}

catch(error){

console.log(error.message);

return null;

}

}



export async function getScanHistory(){

try{

const snapshot = await getDocs(
collection(db,"scan_history")
);


let history=[];


snapshot.forEach((doc)=>{

history.push({

id:doc.id,

...doc.data()

});

});


return history;


}

catch(error){

console.log(error.message);

return [];

}

}



export {

auth,

db

};



