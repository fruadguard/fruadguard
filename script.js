const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if(menuToggle && navMenu){

menuToggle.addEventListener("click",()=>{

navMenu.classList.toggle("active");

});

}


document.querySelectorAll(".nav-menu a").forEach(link=>{

link.addEventListener("click",()=>{

if(navMenu){

navMenu.classList.remove("active");

}

});

});here
const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(navbar){

if(window.scrollY>50){

navbar.style.background="#00152d";
navbar.style.boxShadow="0 8px 20px rgba(0,0,0,.35)";

}else{

navbar.style.background="";
navbar.style.boxShadow="";

}

}

});


document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});
const scanBtn=document.getElementById("scanBtn");
const urlInput=document.getElementById("urlInput");
const scanResult=document.getElementById("scanResult");

if(scanBtn&&urlInput&&scanResult){

scanBtn.addEventListener("click",()=>{

const url=urlInput.value.trim();

if(url===""){

scanResult.innerHTML=`
<h3>⚠️ No URL Found</h3>
<p>Please enter a website address.</p>
`;

return;

}

let risk=25;
let status="Safe";
let color="#22c55e";

const suspicious=[
"login",
"verify",
"secure",
"gift",
"free",
"bonus",
"winner",
"crypto",
"bank",
"wallet",
"update",
"claim"
];

const lower=url.toLowerCase();

suspicious.forEach(word=>{

if(lower.includes(word)){

risk+=8;

}

});

if(!lower.startsWith("https://")){

risk+=20;

}

if(risk>=70){

status="Dangerous";
color="#ef4444";

}else if(risk>=40){

status="Warning";
color="#f59e0b";

}

scanResult.innerHTML=`
<h3 style="color:${color};">${status}</h3>
<p>Risk Score: <strong>${risk}%</strong></p>
<p>Always verify unknown websites before entering personal information.</p>
`;

});

}
document.querySelectorAll("form").forEach(form=>{

form.addEventListener("submit",function(e){

e.preventDefault();

const inputs=this.querySelectorAll("input[required], textarea[required], select[required]");

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()===""){

input.style.borderColor="#ef4444";
valid=false;

}else{

input.style.borderColor="#003b73";

}

});

if(!valid){

alert("Please fill in all required fields.");

return;

}

const btn=this.querySelector("button[type='submit']");

if(btn){

const oldText=btn.textContent;

btn.disabled=true;
btn.textContent="Submitting...";

setTimeout(()=>{

btn.disabled=false;
btn.textContent=oldText;

alert("Submitted successfully.");

this.reset();

},1200);

}

});

});
const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},{
threshold:0.15
});


document.querySelectorAll(".card, .feature-box, .stat-box, .hero-card").forEach(item=>{

observer.observe(item);

});



const counters=document.querySelectorAll(".stat-box h2");


counters.forEach(counter=>{

let target=counter.innerText;

if(!isNaN(target)){

let count=0;

let speed=20;

let update=()=>{

if(count<Number(target)){

count++;

counter.innerText=count;

setTimeout(update,speed);

}else{

counter.innerText=target;

}

};

update();

}

});



window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

