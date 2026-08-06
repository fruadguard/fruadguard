// =========================
// FRAUDGUARD LIVE CHAT
// USER SIDE
// =========================


import { auth, db } from "./firebase.js";


import {

collection,
addDoc,
serverTimestamp,
onSnapshot,
query,
orderBy

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




const sendChat = document.getElementById("sendChat");

const chatMessage = document.getElementById("chatMessage");

const chatBody = document.getElementById("chatBody");





let currentChatID = "";







auth.onAuthStateChanged(async(user)=>{


if(user){


currentChatID = user.uid;



const chatRef = collection(

db,

"chats",

currentChatID,

"messages"

);




const q = query(

chatRef,

orderBy("time","asc")

);





onSnapshot(q,(snapshot)=>{


chatBody.innerHTML="";



snapshot.forEach((doc)=>{


const data = doc.data();



chatBody.innerHTML += `


<p class="${data.sender === 'user' ? 'user-msg':'bot-msg'}">


${data.text}


</p>


`;



});



chatBody.scrollTop = chatBody.scrollHeight;



});



}



});









sendChat.addEventListener("click",async()=>{



const message = chatMessage.value.trim();



if(message==="") return;



if(!currentChatID){

alert("Please login first");

return;

}





await addDoc(

collection(

db,

"chats",

currentChatID,

"messages"

),

{


text:message,

sender:"user",

time:serverTimestamp()


}



);



chatMessage.value="";



});
import {

doc,
setDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";





auth.onAuthStateChanged(async(user)=>{


if(user){


await setDoc(

doc(db,"users",user.uid),

{

email:user.email,

online:true,

lastSeen:serverTimestamp()


},

{

merge:true

}


);


}



});





window.addEventListener("beforeunload",()=>{


if(auth.currentUser){


setDoc(

doc(db,"users",auth.currentUser.uid),

{

online:false,

lastSeen:serverTimestamp()


},

{

merge:true

}


);


}


});
