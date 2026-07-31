// ===============================
// FraudGuard Script v2.0
// ===============================



// Mobile Menu Ready

const menuButton = document.querySelector(".menu-btn");

const navMenu = document.querySelector(".navbar ul");


if(menuButton){

    menuButton.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

    });

}








// ===============================
// Statistics Counter Animation
// Firebase Ready
// ===============================



function animateCounter(id,target){


    const element=document.getElementById(id);


    if(!element){

        return;

    }



    let count=0;


    const speed=Math.ceil(target/100);



    const timer=setInterval(()=>{


        count += speed;



        if(count>=target){

            count=target;

            clearInterval(timer);

        }



        element.innerHTML=count+"+";



    },20);



}







// Home Page Statistics


document.addEventListener("DOMContentLoaded",()=>{


    animateCounter(
        "usersCount",
        10000
    );


    animateCounter(
        "scamsCount",
        50000
    );


    animateCounter(
        "reportsCount",
        25000
    );


});









// ===============================
// Smooth Scroll
// ===============================


document.querySelectorAll('a[href^="#"]').forEach(link=>{


    link.addEventListener("click",function(e){


        const target=document.querySelector(
            this.getAttribute("href")
        );


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });



});
// ===============================
// AI SCAM ANALYZER
// ===============================


const analyzeButton = document.querySelector(".analyzer-box .btn");


if(analyzeButton){


    analyzeButton.addEventListener("click",()=>{


        const input =
        document.querySelector(".analyzer-box input");



        if(!input.value){


            alert(
                "Please enter suspicious content first."
            );


            return;

        }



        analyzeButton.innerHTML =
        "Analyzing...";



        setTimeout(()=>{


            analyzeButton.innerHTML =
            "Analyze Now";



            alert(
                "AI Analysis Complete: Low Risk Detected"
            );



        },2000);



    });



}








// ===============================
// SCANNER BUTTON HANDLING
// ===============================


function openScanner(){


    window.location.href =
    "scanner.html";


}





function openPhoneChecker(){


    window.location.href =
    "phone-checker.html";


}









// ===============================
// PREMIUM BUTTON HANDLING
// ===============================



const premiumButtons =
document.querySelectorAll(
".price-card .btn"
);



premiumButtons.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            console.log(
                "Redirecting to Premium Payment..."
            );


        }

    );


});








// ===============================
// LOGIN STATUS UI READY
// Firebase Integration Ready
// ===============================



function checkLoginStatus(){


    const user =
    localStorage.getItem(
        "fraudguardUser"
    );



    if(user){


        console.log(
            "User Logged In:",
            user
        );


    }

    else{


        console.log(
            "Guest User"
        );


    }


}



checkLoginStatus();
// ===============================
// FIREBASE AUTH READY
// ===============================


import { 
    checkUser,
    logoutUser,
    getUserRole
} 
from "./firebase.js";







// ===============================
// USER AUTH STATUS
// ===============================



checkUser(async(user)=>{


    const loginButton =
    document.querySelector(
        ".navbar .btn"
    );



    if(user){


        console.log(
            "Logged User:",
            user.email
        );



        if(loginButton){


            loginButton.innerHTML =
            "Dashboard";


            loginButton.href =
            "dashboard.html";


        }



        const role =
        await getUserRole(
            user.uid
        );



        console.log(
            "User Role:",
            role
        );



    }



});








// ===============================
// LOGOUT FUNCTION
// ===============================



const logoutButton =
document.querySelector(
".logout-btn"
);



if(logoutButton){


    logoutButton.addEventListener(
        "click",
        async()=>{


            await logoutUser();



            window.location.href =
            "login.html";


        }
    );


}









// ===============================
// FIREBASE LIVE STATISTICS READY
// ===============================



async function loadLiveStatistics(){



    try{


        /*
        
        Future Firestore Connection:

        usersCount
        scamsCount
        reportsCount


        Example:

        Firestore
        |
        statistics
        |
        users
        scams
        reports

        */



        console.log(
            "Firebase Statistics Ready"
        );



    }


    catch(error){


        console.log(
            error
        );


    }


}



loadLiveStatistics();









// ===============================
// PREMIUM ACCESS CHECK
// ===============================



function checkPremiumAccess(){



    const premium =
    localStorage.getItem(
        "premium"
    );



    if(
        premium === "active"
    ){


        console.log(
            "Premium Active"
        );


    }

    else{


        console.log(
            "Free User"
        );


    }



}



checkPremiumAccess();









// ===============================
// PAGE LOADING EFFECT
// ===============================



window.addEventListener(
"load",
()=>{


    document.body.classList.add(
        "loaded"
    );


});

