import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyCNK3tHXMTS_-mu8IAHW9q7hgo4TkBGuSs",
authDomain:"fraudguard-eafd2.firebaseapp.com",
projectId:"fraudguard-eafd2",
storageBucket:"fraudguard-eafd2.firebasestorage.app",
messagingSenderId:"721145048132",
appId:"1:721145048132:web:c87c07d58d8e9b5b806011"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

const provider=new GoogleAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyCNK3tHXMTS_-mu8IAHW9q7hgo4TkBGuSs",
authDomain:"fraudguard-eafd2.firebaseapp.com",
projectId:"fraudguard-eafd2",
storageBucket:"fraudguard-eafd2.firebasestorage.app",
messagingSenderId:"721145048132",
appId:"1:721145048132:web:c87c07d58d8e9b5b806011"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

const provider=new GoogleAuthProvider();
// Submit Scam Report
window.submitReport = async function () {

const name = document.getElementById("name").value;
const email = document.getElementById("emailReport").value;
const phone = document.getElementById("phoneReport").value;
const report = document.getElementById("report").value;

if(name==="" || email==="" || phone==="" || report===""){
alert("Please fill all fields.");
return;
}

try{

await addDoc(collection(db,"reports"),{

name:name,
email:email,
phone:phone,
report:report,
createdAt:new Date()

});

alert("Report submitted successfully!");

document.getElementById("name").value="";
document.getElementById("emailReport").value="";
document.getElementById("phoneReport").value="";
document.getElementById("report").value="";

}catch(error){

alert(error.message);

}

};


// Load Reports
window.loadReports = async function(){

const reportsList=document.getElementById("reportsList");

if(!reportsList) return;

reportsList.innerHTML="";

try{

const querySnapshot=await getDocs(collection(db,"reports"));

querySnapshot.forEach((reportDoc)=>{

const data=reportDoc.data();

reportsList.innerHTML+=`

<div class="card">

<b>Name:</b> ${data.name}<br>
<b>Email:</b> ${data.email}<br>
<b>Phone:</b> ${data.phone}<br>
<b>Report:</b> ${data.report}<br><br>

<button onclick="deleteReport('${reportDoc.id}')">
🗑 Delete
</button>

</div>

`;

});

}catch(error){

alert(error.message);

}

};


// Delete Report
window.deleteReport = async function(id){

if(!confirm("Delete this report?")) return;

try{

await deleteDoc(doc(db,"reports",id));

alert("Report deleted.");

loadReports();

}catch(error){

alert(error.message);

}

};
// URL Scanner
window.scanURL = async function () {

const url = document.getElementById("urlInput").value.trim();
const result = document.getElementById("scanResult");

if(url===""){
result.innerHTML="❌ Please enter a website URL.";
result.style.color="red";
return;
}

result.innerHTML="🔍 Scanning...";
result.style.color="orange";

try{

const response = await fetch(

"https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyCNK3tHXMTS_-mu8IAHW9q7hgo4TkBGuSs",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

client:{
clientId:"fraudguard",
clientVersion:"1.0"
},

threatInfo:{

threatTypes:[
"MALWARE",
"SOCIAL_ENGINEERING",
"UNWANTED_SOFTWARE",
"POTENTIALLY_HARMFUL_APPLICATION"
],

platformTypes:["ANY_PLATFORM"],

threatEntryTypes:["URL"],

threatEntries:[
{url:url}
]

}

})

}

);

const data = await response.json();

if(data.matches){

result.innerHTML="🚨 Dangerous website detected!";
result.style.color="red";

}else{

result.innerHTML="✅ No threat found.";
result.style.color="#22c55e";

}

}catch(error){

result.innerHTML=error.message;
result.style.color="red";

}

};


// Phone Number Checker
window.checkPhone = async function(){

const phone=document.getElementById("phoneInput").value.trim();
const result=document.getElementById("phoneResult");

if(phone===""){

result.innerHTML="❌ Enter phone number.";
result.style.color="red";
return;

}

try{

const querySnapshot=await getDocs(collection(db,"reports"));

let found=false;

querySnapshot.forEach((reportDoc)=>{

const data=reportDoc.data();

if(data.phone===phone){

found=true;

}

});

if(found){

result.innerHTML="⚠️ Scam number found.";
result.style.color="red";

}else{

result.innerHTML="✅ No scam report found.";
result.style.color="#22c55e";

}

}catch(error){

result.innerHTML=error.message;
result.style.color="red";

}

};
// AI Scam Checker
window.checkScam = function () {

const text = document.getElementById("aiInput").value.trim();
const result = document.getElementById("aiResult");

if(text===""){
result.innerHTML="❌ Please enter a message or website.";
result.style.color="red";
return;
}

const keywords=[
"otp",
"verify account",
"bank account",
"gift card",
"crypto",
"bitcoin",
"investment",
"double money",
"loan",
"click here",
"urgent",
"password",
"login",
"free money",
"winner",
"congratulation",
"telegram",
"whatsapp"
];

let score=0;

keywords.forEach((word)=>{

if(text.toLowerCase().includes(word)){
score++;
}

});

if(score>=3){

result.innerHTML="🚨 High Risk Scam Detected";
result.style.color="red";

}else if(score>=1){

result.innerHTML="⚠️ Suspicious Content";
result.style.color="orange";

}else{

result.innerHTML="✅ Looks Safe";
result.style.color="#22c55e";

}

};
