// ============================================================
// FraudGuard - Global Authentication & Common Script
// ============================================================

import {
    auth
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ============================================================
// AUTHENTICATION PROTECTION
// ============================================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


// Pages that do NOT require login
const publicPages = [
    "",
    "login.html",
    "register.html"
];


// ============================================================
// CHECK LOGIN
// ============================================================

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            // User is not logged in

            if (!publicPages.includes(currentPage)) {

                window.location.replace(
                    "login.html"
                );

            }

            return;
        }


        // ====================================================
        // USER IS LOGGED IN
        // ====================================================

        /*
         * If logged-in user opens login/register page,
         * send them directly to the main Home page.
         */

        if (
            currentPage === "login.html" ||
            currentPage === "register.html"
        ) {

            window.location.replace(
                "index.html"
            );

            return;
        }


        // User is allowed to continue
        document.documentElement
            .classList.add("authenticated");


        // Update user information if elements exist
        updateUserInformation(user);

    }
);


// ============================================================
// UPDATE USER INFORMATION
// ============================================================

function updateUserInformation(user) {

    const userNameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    const userEmailElements =
        document.querySelectorAll(
            "[data-user-email]"
        );


    const userPhotoElements =
        document.querySelectorAll(
            "[data-user-photo]"
        );


    const displayName =
        user.displayName ||
        user.email?.split("@")[0] ||
        "User";


    const email =
        user.email || "";


    userNameElements.forEach(
        (element) => {

            element.textContent =
                displayName;

        }
    );


    userEmailElements.forEach(
        (element) => {

            element.textContent =
                email;

        }
    );


    userPhotoElements.forEach(
        (element) => {

            if (user.photoURL) {

                element.src =
                    user.photoURL;

            }

        }
    );

}


// ============================================================
// LOGOUT FUNCTION
// ============================================================

async function logoutUser() {

    try {

        await signOut(auth);


        window.location.replace(
            "login.html"
        );


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );


        alert(
            "Unable to logout. Please try again."
        );

    }

}


// ============================================================
// MAKE LOGOUT AVAILABLE
// ============================================================

window.logoutUser =
    logoutUser;


// ============================================================
// AUTOMATIC LOGOUT BUTTON SUPPORT
// ============================================================
//
// Any button/link with:
//
// id="logoutBtn"
//
// or
//
// data-logout
//
// will automatically logout the user.
// ============================================================

document.addEventListener(
    "click",
    (event) => {

        const logoutElement =
            event.target.closest(
                "#logoutBtn, [data-logout]"
            );


        if (!logoutElement) {
            return;
        }


        event.preventDefault();

        logoutUser();

    }
);


// ============================================================
// AUTHENTICATED USER READY EVENT
// ============================================================

document.dispatchEvent(
    new CustomEvent(
        "fraudguard-auth-ready"
    )
);
