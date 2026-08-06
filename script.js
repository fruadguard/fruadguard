// =============================
// FRAUDGUARD MAIN SCRIPT
// =============================



// =============================
// DARK MODE
// =============================


const darkModeBtn = document.getElementById("darkModeBtn");


if(darkModeBtn){


darkModeBtn.onclick = ()=>{


document.body.classList.toggle("dark-mode");


localStorage.setItem(

"darkMode",

document.body.classList.contains("dark-mode")

);


}


}




if(localStorage.getItem("darkMode") === "true"){


document.body.classList.add("dark-mode");


}








// =============================
// LOGIN SYSTEM
// =============================


import { auth } from "./firebase.js";


import {


signInWithEmailAndPassword,

createUserWithEmailAndPassword,

signOut,

GoogleAuthProvider,

signInWithPopup


}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";







// LOGIN


window.loginUser = function(){



const email =

document.getElementById("loginEmail").value;



const password =

document.getElementById("loginPassword").value;




signInWithEmailAndPassword(

auth,

email,

password

)


.then(()=>{


window.location.href="dashboard.html";


})


.catch((error)=>{


alert(error.message);


});


}







// REGISTER


window.registerUser = function(){



const name =

document.getElementById("fullName").value;



const email =

document.getElementById("registerEmail").value;



const password =

document.getElementById("registerPassword").value;



const confirmPassword =

document.getElementById("confirmPassword").value;





if(password !== confirmPassword){


alert("Password not match");


return;


}






createUserWithEmailAndPassword(

auth,

email,

password

)


.then(()=>{


alert("Account Created Successfully");


window.location.href="dashboard.html";


})


.catch((error)=>{


alert(error.message);


});



}








// LOGOUT


window.logoutUser=function(){


signOut(auth)


.then(()=>{


window.location.href="login.html";


});


}








// =============================
// GOOGLE LOGIN
// =============================


const googleLoginBtn =

document.getElementById("googleLoginBtn");



if(googleLoginBtn){


googleLoginBtn.onclick=()=>{


const provider = new GoogleAuthProvider();



signInWithPopup(

auth,

provider

)


.then(()=>{


window.location.href="dashboard.html";


})


.catch(error=>{


alert(error.message);


});


}


}







// =============================
// LIVE CHAT UI
// =============================



const chatBtn =

document.getElementById("chatBtn");



const chatBox =

document.getElementById("chatBox");



const closeChat =

document.getElementById("closeChat");





if(chatBtn){


chatBtn.onclick=()=>{


chatBox.style.display="block";


}


}






if(closeChat){


closeChat.onclick=()=>{


chatBox.style.display="none";


}


}







const sendChat =

document.getElementById("sendChat");



const chatMessage =

document.getElementById("chatMessage");



const chatBody =

document.getElementById("chatBody");






if(sendChat){



sendChat.onclick=()=>{



let message =

chatMessage.value.trim();




if(message==="") return;






chatBody.innerHTML += `


<p class="user-msg">

${message}

</p>


`;



chatMessage.value="";




}


}







// =============================
// COPY RESULT
// =============================



const copyBtn =

document.getElementById("copyBtn");



if(copyBtn){


copyBtn.onclick=()=>{


navigator.clipboard.writeText(

document.body.innerText

);


alert("Copied");


}


}







// =============================
// SHARE RESULT
// =============================


const shareBtn =

document.getElementById("shareBtn");



if(shareBtn){


shareBtn.onclick=()=>{


if(navigator.share){


navigator.share({


title:"FraudGuard Result",

text:document.body.innerText


});


}



}


}
