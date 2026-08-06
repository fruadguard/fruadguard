/* ==========================================
   FRAUDGUARD MAIN SCRIPT
   PART 1
========================================== */


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");


if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}



/* ==========================================
   CURRENT YEAR FOOTER
========================================== */


const year = document.querySelector("#year");


if(year){

    year.textContent = new Date().getFullYear();

}



/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */


const reveals = document.querySelectorAll(".reveal");


window.addEventListener("scroll",()=>{


    reveals.forEach(item=>{


        const windowHeight = window.innerHeight;

        const elementTop = item.getBoundingClientRect().top;


        if(elementTop < windowHeight - 100){

            item.classList.add("active");

        }


    });


});



/* ==========================================
   BUTTON CLICK ANIMATION
========================================== */


const buttons = document.querySelectorAll("button, .btn");


buttons.forEach(btn=>{


    btn.addEventListener("click",()=>{


        btn.style.transform="scale(.96)";


        setTimeout(()=>{

            btn.style.transform="";

        },150);


    });


});



/* ==========================================
   URL BASIC VALIDATION
========================================== */


function checkURL(url){


    try{

        new URL(url);

        return true;

    }

    catch(error){

        return false;

    }


}



/* ==========================================
   SHOW MESSAGE
========================================== */


function showMessage(element,message,type){


    if(!element) return;


    element.innerHTML = message;


    element.className = type;


}
/* ==========================================
   URL SCANNER SYSTEM
   PART 2
========================================== */


/*
   Basic Fraud Risk Analyzer
*/

function analyzeURL(url){


    let risk = 0;

    let result = {
        status:"",
        score:0,
        message:""
    };


    const suspiciousWords = [

        "login",
        "verify",
        "update",
        "secure",
        "bonus",
        "free",
        "gift",
        "crypto",
        "wallet",
        "password"

    ];



    suspiciousWords.forEach(word=>{


        if(url.toLowerCase().includes(word)){

            risk += 10;

        }


    });



    if(!url.startsWith("https")){

        risk +=20;

    }



    if(url.length > 80){

        risk +=10;

    }



    if(risk >=50){


        result.status="danger";

        result.message="High risk website detected. Be careful before opening this link.";


    }

    else if(risk >=25){


        result.status="warning";

        result.message="Suspicious activity found. Check carefully.";

    }

    else{


        result.status="safe";

        result.message="No major risk detected.";

    }



    result.score = Math.min(risk,100);


    return result;


}



/* ==========================================
   SCANNER BUTTON ACTION
========================================== */


const scanButton = document.querySelector("#scanBtn");


if(scanButton){


    scanButton.addEventListener("click",()=>{


        const input =
        document.querySelector("#urlInput");


        const output =
        document.querySelector("#scanResult");



        if(!input.value){


            showMessage(
                output,
                "Please enter a website URL",
                "error-message"
            );

            return;

        }



        if(!checkURL(input.value)){


            showMessage(
                output,
                "Invalid URL format",
                "error-message"
            );

            return;

        }



        const result =
        analyzeURL(input.value);



        output.innerHTML = `

        <h3>
        Risk Score: ${result.score}/100
        </h3>

        <span class="badge badge-${result.status}">
        ${result.status.toUpperCase()}
        </span>

        <p>${result.message}</p>

        `;



        output.className =
        "result-card " + result.status;



    });


}



/* ==========================================
   PHONE NUMBER CHECK BASIC
========================================== */


function checkPhoneNumber(number){


    if(number.length < 8){

        return {

            status:"warning",

            message:"Invalid phone number"

        };

    }



    return {

        status:"safe",

        message:"No fraud report found"

    };


}



/* ==========================================
   LOCAL SCAN HISTORY
========================================== */


function saveScanHistory(data){


    let history =
    JSON.parse(localStorage.getItem("scanHistory")) || [];



    history.unshift(data);



    localStorage.setItem(

        "scanHistory",

        JSON.stringify(history)

    );


}



function getScanHistory(){


    return JSON.parse(

        localStorage.getItem("scanHistory")

    ) || [];


}
/* ==========================================
   FIREBASE SUPPORT SYSTEM
   PART 3
========================================== */


/*
   Save Fraud Report Data
   (Firestore connection firebase.js থেকে আসবে)
*/


async function saveFraudReport(data){


    try{


        if(typeof db === "undefined"){

            console.log("Firebase database not connected");

            return false;

        }



        await db.collection("reports").add({


            ...data,

            createdAt:new Date()


        });



        return true;


    }

    catch(error){


        console.log(
            "Report Save Error:",
            error
        );


        return false;


    }


}




/* ==========================================
   REPORT FORM HANDLER
========================================== */


const reportForm =
document.querySelector("#reportForm");



if(reportForm){


reportForm.addEventListener(
"submit",
async function(e){


e.preventDefault();



const reportData = {


name:
document.querySelector("#reportName")?.value || "",


contact:
document.querySelector("#reportContact")?.value || "",


type:
document.querySelector("#fraudType")?.value || "",


details:
document.querySelector("#reportDetails")?.value || "",



status:"pending"


};




const saved =
await saveFraudReport(reportData);



const msg =
document.querySelector("#reportMessage");



if(saved){


showMessage(

msg,

"Report submitted successfully",

"success-message"

);


reportForm.reset();



}

else{


showMessage(

msg,

"Report submission failed",

"error-message"

);


}



});

}



/* ==========================================
   USER AUTH UI CHECK
========================================== */


function updateUserUI(user){



const userName =
document.querySelector("#userName");


const loginBtn =
document.querySelector("#loginBtn");


const logoutBtn =
document.querySelector("#logoutBtn");



if(user){


if(userName){

userName.innerHTML =
user.email;

}



if(loginBtn){

loginBtn.style.display="none";

}



if(logoutBtn){

logoutBtn.style.display="block";

}



}

else{


if(loginBtn){

loginBtn.style.display="block";

}



if(logoutBtn){

logoutBtn.style.display="none";

}



}



}



/* ==========================================
   LOGOUT FUNCTION
========================================== */


function logoutUser(){



if(typeof auth !== "undefined"){


auth.signOut()

.then(()=>{


window.location.href="login.html";


});


}


}



/* ==========================================
   LOAD PAGE MESSAGE
========================================== */


window.addEventListener(
"load",
()=>{


const loader =
document.querySelector(".loader");



if(loader){

loader.style.display="none";

}



});
/* ==========================================
   DASHBOARD SYSTEM
   PART 4
========================================== */


/* ==========================================
   LOAD USER SCAN HISTORY
========================================== */


function loadScanHistoryUI(){


    const box =
    document.querySelector("#scanHistory");


    if(!box) return;



    const history =
    getScanHistory();



    if(history.length === 0){


        box.innerHTML =
        "<p>No scan history found</p>";

        return;

    }



    box.innerHTML = history.map(item=>`


        <div class="card">

            <h4>${item.url || "Unknown URL"}</h4>

            <p>
            Risk Score:
            ${item.score || 0}/100
            </p>

            <span class="badge badge-${item.status}">
            ${item.status}
            </span>

        </div>


    `).join("");



}



/* ==========================================
   SAVE CURRENT SCAN
========================================== */


function saveCurrentScan(url,result){



    saveScanHistory({

        url:url,

        score:result.score,

        status:result.status,

        date:new Date().toLocaleString()

    });



}



/* ==========================================
   ADMIN REPORT VIEW
========================================== */


async function loadAdminReports(){



const reportBox =
document.querySelector("#adminReports");



if(!reportBox) return;



try{


if(typeof db==="undefined"){


reportBox.innerHTML =
"Database not connected";


return;


}



const snapshot =
await db.collection("reports")
.orderBy("createdAt","desc")
.get();



if(snapshot.empty){


reportBox.innerHTML =
"No reports found";


return;


}



let html="";



snapshot.forEach(doc=>{


const data=doc.data();



html += `


<div class="card">


<h3>${data.type || "Fraud Report"}</h3>


<p>
${data.details || ""}
</p>


<small>
Status: ${data.status}
</small>


</div>


`;



});



reportBox.innerHTML=html;



}

catch(error){


console.log(error);


}


}




/* ==========================================
   ADMIN UPDATE REPORT STATUS
========================================== */


async function updateReportStatus(id,status){



try{


await db.collection("reports")
.doc(id)
.update({


status:status


});



alert("Report updated");


loadAdminReports();



}

catch(error){


console.log(error);


}



}



/* ==========================================
   AUTO LOAD DASHBOARD DATA
========================================== */


window.addEventListener(
"DOMContentLoaded",
()=>{


loadScanHistoryUI();


loadAdminReports();



});
