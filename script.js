// ==========================================
// FraudGuard Global Script
// ==========================================


// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.querySelector(".nav-menu");


if(menuBtn && navMenu){

menuBtn.addEventListener("click",()=>{

navMenu.classList.toggle("active");

});

}




// Page Loading Animation

window.addEventListener("load",()=>{


document.body.classList.add("loaded");


});





// Contact Form

const contactForm = document.querySelector(".contact-form form");


if(contactForm){


contactForm.addEventListener("submit",(e)=>{


e.preventDefault();


alert("Message sent successfully!");


contactForm.reset();



});


}
import { auth } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const loginBtn = document.querySelector('a[href="login.html"]');
const registerBtn = document.querySelector('a[href="register.html"]');



onAuthStateChanged(auth,(user)=>{


if(user){


if(loginBtn){

loginBtn.style.display="none";

}


if(registerBtn){

registerBtn.innerHTML="Dashboard";

registerBtn.href="dashboard.html";

}


}else{


if(loginBtn){

loginBtn.style.display="block";

}


if(registerBtn){

registerBtn.innerHTML="Create Account";

registerBtn.href="register.html";

}


}


});
