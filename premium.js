import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

export function checkPremium(callback){

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="login.html";
return;

}

try{

const snap=await getDoc(doc(db,"subscriptions",user.uid));

if(snap.exists() && snap.data().premium===true){

callback(true);

}else{

callback(false);

}

}catch(error){

console.log(error);

callback(false);

}

});

}
