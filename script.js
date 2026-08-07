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
