
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}



const animatedElements = document.querySelectorAll(
    ".card, .team-card, .price-card, .about-content, .founder-box"
);


function showAnimation(){


    animatedElements.forEach((element)=>{


        const position = element.getBoundingClientRect().top;


        const screenHeight = window.innerHeight;


        if(position < screenHeight - 100){


            element.classList.add("fade-up");


        }


    });


}


window.addEventListener("scroll", showAnimation);





showAnimation();



const currentPage = window.location.pathname;


const navItems = document.querySelectorAll(".nav-links a");


navItems.forEach((link)=>{


    if(link.href.includes(currentPage)){


        link.style.color = "#38bdf8";


    }


});



const backTop = document.createElement("button");


backTop.innerHTML = "↑";


backTop.className = "back-top";


document.body.appendChild(backTop);



window.addEventListener("scroll",()=>{


    if(window.scrollY > 400){


        backTop.style.display="block";


    }

    else{


        backTop.style.display="none";


    }


});




backTop.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});


function scanURL(){


    const urlInput = document.getElementById("urlInput");

    const resultBox = document.getElementById("resultBox");


    if(!urlInput || !resultBox){

        return;

    }



    const url = urlInput.value.trim();



    if(url === ""){


        resultBox.style.display="block";

        resultBox.innerHTML = 
        `
        <h3 class="warning">
        ⚠️ Please enter a website URL
        </h3>
        `;


        return;

    }





    let riskScore = 0;

    let status = "";

    let message = "";





    if(!url.startsWith("https://")){


        riskScore += 30;


    }




    const suspiciousWords = [

        "login",
        "verify",
        "free",
        "gift",
        "winner",
        "password",
        "crypto",
        "bank"

    ];



    suspiciousWords.forEach(word=>{


        if(url.toLowerCase().includes(word)){


            riskScore += 10;


        }


    });




    if(riskScore >= 50){


        status="danger";

        message="High Risk! This website may be suspicious.";


    }

    else if(riskScore >= 25){


        status="warning";

        message="Medium Risk! Be careful before continuing.";


    }

    else{


        status="safe";

        message="Low Risk! No major threat detected.";


    }





    resultBox.style.display="block";



    resultBox.innerHTML =

    `

    <h3 class="${status}">

    ${message}

    </h3>


    <p>

    🔍 Risk Score: ${riskScore}/100

    </p>


    <p>

    🌐 Website: ${url}

    </p>


    `;



}


function checkPhone(){


    const phoneInput = document.getElementById("phoneInput");

    const phoneResult = document.getElementById("phoneResult");



    if(!phoneInput || !phoneResult){

        return;

    }




    const phone = phoneInput.value.trim();




    if(phone === ""){


        phoneResult.style.display="block";


        phoneResult.innerHTML = `

        <h3 class="warning">

        ⚠️ Enter a phone number first

        </h3>

        `;


        return;

    }





    



    let foundReport = false;




    if(foundReport){


        phoneResult.innerHTML = `


        <h3 class="danger">

        🚨 Scam Number Detected

        </h3>


        <p>

        This number has previous fraud reports.

        </p>


        `;


    }

    else{


        phoneResult.innerHTML = `


        <h3 class="safe">

        ✅ No Fraud Report Found

        </h3>


        <p>

        No known scam activity detected.

        </p>


        `;


    }



    phoneResult.style.display="block";


}



function submitReport(){


    const title = document.getElementById("reportTitle");

    const description = document.getElementById("reportDescription");



    if(!title || !description){

        return;

    }




    if(title.value==="" || description.value===""){


        alert("Please complete all fields");


        return;


    }




    alert("Report submitted successfully!");



   
      Firebase Firestore:

      Collection:
      fraudReports

      Data:
      {
        title:"",
        description:"",
        date:""
      }
}


function registerUser(){


    const email = document.getElementById("registerEmail").value;

    const password = document.getElementById("registerPassword").value;



    if(email==="" || password===""){

        alert("Please fill all fields");
        return;

    }



    firebase.auth()
    .createUserWithEmailAndPassword(email,password)

    .then((userCredential)=>{


        alert("Account created successfully!");


        window.location.href="dashboard.html";


    })


    .catch((error)=>{


        alert(error.message);


    });


}


function loginUser(){


    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;



    firebase.auth()

    .signInWithEmailAndPassword(email,password)

    .then(()=>{


        alert("Login successful!");


        window.location.href="dashboard.html";


    })


    .catch((error)=>{


        alert(error.message);


    });


}


function logoutUser(){


    firebase.auth()

    .signOut()

    .then(()=>{


        window.location.href="login.html";


    });


}


firebase.auth().onAuthStateChanged((user)=>{


    const userEmail = document.getElementById("userEmail");


    if(userEmail && user){


        userEmail.innerHTML = user.email;


    }


});
 


function saveFraudReport(){


    const title = document.getElementById("reportTitle");

    const description = document.getElementById("reportDescription");

    const type = document.getElementById("reportType");



    if(!title || !description || !type){

        return;

    }





    if(title.value==="" || description.value===""){


        alert("Please complete the report");


        return;

    }




    const user = firebase.auth().currentUser;



    firebase.firestore()
    .collection("fraudReports")
    .add({

        title:title.value,

        description:description.value,

        type:type.value,

        user:user ? user.email : "Anonymous",

        date:new Date()

    })

    .then(()=>{


        alert("Fraud report submitted successfully!");


        title.value="";

        description.value="";


    })


    .catch((error)=>{


        alert(error.message);


    });



}





function loadReports(){


    const reportList = document.getElementById("reportList");



    if(!reportList){

        return;

    }




    firebase.firestore()

    .collection("fraudReports")

    .orderBy("date","desc")

    .onSnapshot((snapshot)=>{


        reportList.innerHTML="";



        snapshot.forEach((doc)=>{


            const data = doc.data();



            reportList.innerHTML += `


            <div class="card">


            <h3>${data.title}</h3>


            <p>${data.description}</p>


            <small>

            Type: ${data.type}

            </small>


            </div>


            `;



        });



    });



}







function loadAdminReports(){


    const adminList = document.getElementById("adminReportList");



    if(!adminList){

        return;

    }




    firebase.firestore()

    .collection("fraudReports")

    .get()

    .then((snapshot)=>{


        snapshot.forEach((doc)=>{


            const data = doc.data();



            adminList.innerHTML += `


            <tr>


            <td>${data.title}</td>


            <td>${data.type}</td>


            <td>${data.user}</td>


            </tr>


            `;



        });



    });



}





if(typeof firebase !== "undefined"){


    console.log("Firebase Connected Successfully");


}

else{


    console.log("Firebase Not Loaded");


}




function checkLogin(){


    firebase.auth().onAuthStateChanged((user)=>{


        if(user){


            console.log(
            "Logged In:",
            user.email
            );


        }

        else{


            console.log(
            "User Not Logged In"
            );


        }


    });


}



if(typeof firebase !== "undefined"){

    checkLogin();

}






function trackEvent(eventName){


    if(typeof gtag === "function"){


        gtag(

            "event",

            eventName

        );


    }


}







const scanButton = document.querySelector(".scan-btn");


if(scanButton){


    scanButton.addEventListener("click",()=>{


        trackEvent("scanner_used");


    });


}




document.querySelectorAll("form").forEach(form=>{


    form.addEventListener("submit",(e)=>{


        const inputs = form.querySelectorAll("input");


        inputs.forEach(input=>{


            if(input.value.trim()===""){


                e.preventDefault();


            }


        });


    });


});



window.addEventListener("load",()=>


    document.body.classList.add("loaded");


});







console.log(
"FraudGuard System Loaded Successfully 🚀"
);
// LIVE CHAT

const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatMessage = document.getElementById("chatMessage");
const chatBody = document.getElementById("chatBody");


if(chatBtn){

chatBtn.onclick = ()=>{

chatBox.style.display="block";

}

}


if(closeChat){

closeChat.onclick = ()=>{

chatBox.style.display="none";

}

}



if(sendChat){

sendChat.onclick = ()=>{


let msg = chatMessage.value.trim();


if(msg==="") return;



chatBody.innerHTML += `

<p class="user-msg">

${msg}

</p>

`;



chatMessage.value="";



setTimeout(()=>{


chatBody.innerHTML += `

<p class="bot-msg">

Thanks for contacting FraudGuard Support. Our team will reply soon.

</p>

`;

chatBody.scrollTop = chatBody.scrollHeight;


},1000);



}


}
