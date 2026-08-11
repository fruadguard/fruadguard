/* =========================================================
   INSPECT CALLER — AUTH.JS
   PROJECT 533
   Firebase Authentication
========================================================= */


/*
   IMPORTANT
   ---------
   Firebase configuration should be loaded from firebase.js.

   firebase.js should provide:

   auth
   db

   Example:

   import { auth, db } from "./firebase.js";
*/


import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";



/* =========================================================
   LOGIN
========================================================= */

export async function loginUser(email, password) {

    try {

        email = email.trim().toLowerCase();

        if (!email || !password) {

            throw new Error(
                "Email and password are required."
            );

        }


        const result =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        return {
            success: true,
            user: result.user
        };


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        return {
            success: false,
            code: error.code,
            message: getAuthErrorMessage(error.code)
        };

    }

}



/* =========================================================
   REGISTER
========================================================= */

export async function registerUser(
    name,
    email,
    password
) {

    try {

        name = name.trim();

        email =
            email.trim().toLowerCase();


        if (!name) {

            throw new Error(
                "Name is required."
            );

        }


        if (!email || !password) {

            throw new Error(
                "Email and password are required."
            );

        }


        if (password.length < 6) {

            throw new Error(
                "Password must contain at least 6 characters."
            );

        }


        /* Create Firebase account */

        const result =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            result.user;


        /* Update Firebase display name */

        await updateProfile(
            user,
            {
                displayName: name
            }
        );


        /* Save user profile */

        await setDoc(
            doc(
                db,
                "users",
                user.uid
            ),
            {

                uid: user.uid,

                name: name,

                email: email,

                role: "user",

                createdAt:
                    serverTimestamp(),

                status: "active"

            }
        );


        return {

            success: true,

            user: user

        };


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        return {

            success: false,

            code: error.code,

            message:
                error.message ||
                getAuthErrorMessage(error.code)

        };

    }

}



/* =========================================================
   LOGOUT
========================================================= */

export async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "login.html";


    } catch (error) {

        console.error(
            "Logout Error:",
            error
        );

    }

}



/* =========================================================
   CURRENT USER
========================================================= */

export function getCurrentUser() {

    return auth.currentUser;

}



/* =========================================================
   AUTH STATE LISTENER
========================================================= */

export function watchAuthState(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );

}



/* =========================================================
   REQUIRE LOGIN
========================================================= */

export function requireLogin() {

    onAuthStateChanged(
        auth,
        function(user) {

            if (!user) {

                window.location.href =
                    "login.html";

            }

        }
    );

}



/* =========================================================
   REDIRECT IF ALREADY LOGGED IN
========================================================= */

export function redirectIfLoggedIn() {

    onAuthStateChanged(
        auth,
        function(user) {

            if (user) {

                window.location.href =
                    "dashboard.html";

            }

        }
    );

}



/* =========================================================
   GET USER PROFILE
========================================================= */

export async function getUserProfile(uid) {

    try {

        if (!uid) {

            return null;

        }


        const snapshot =
            await getDoc(
                doc(
                    db,
                    "users",
                    uid
                )
            );


        if (!snapshot.exists()) {

            return null;

        }


        return snapshot.data();


    } catch (error) {

        console.error(
            "Profile Error:",
            error
        );


        return null;

    }

}



/* =========================================================
   ADMIN CHECK
========================================================= */

export async function isAdmin(uid) {

    try {

        if (!uid) {

            return false;

        }


        const profile =
            await getUserProfile(uid);


        if (!profile) {

            return false;

        }


        return profile.role === "admin";


    } catch (error) {

        console.error(
            "Admin Check Error:",
            error
        );


        return false;

    }

}



/* =========================================================
   REQUIRE ADMIN
========================================================= */

export function requireAdmin() {

    onAuthStateChanged(
        auth,
        async function(user) {

            if (!user) {

                window.location.href =
                    "login.html";

                return;

            }


            const admin =
                await isAdmin(user.uid);


            if (!admin) {

                alert(
                    "Access denied. Admin authorization required."
                );


                window.location.href =
                    "dashboard.html";

            }

        }
    );

}



/* =========================================================
   AUTH ERROR TRANSLATOR
========================================================= */

function getAuthErrorMessage(code) {

    switch (code) {

        case "auth/invalid-email":

            return "Please enter a valid email address.";


        case "auth/user-disabled":

            return "This account has been disabled.";


        case "auth/user-not-found":

            return "No account was found with this email.";


        case "auth/wrong-password":

            return "Incorrect password.";


        case "auth/invalid-credential":

            return "Email or password is incorrect.";


        case "auth/email-already-in-use":

            return "An account already exists with this email.";


        case "auth/weak-password":

            return "Password is too weak.";


        case "auth/network-request-failed":

            return "Network error. Please check your connection.";


        case "auth/too-many-requests":

            return "Too many attempts. Please try again later.";


        default:

            return "Authentication failed. Please try again.";

    }

}



/* =========================================================
   EXPORT AUTH
========================================================= */

export {
    auth
};
