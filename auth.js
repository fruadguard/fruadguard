/* =========================================================
   INSPECT CALLER
   AUTHENTICATION SYSTEM
   auth.js
   ========================================================= */


/* =========================================================
   GLOBAL AUTH STATE
   ========================================================= */

let currentUser = null;


/* =========================================================
   CHECK FIREBASE AUTH
   ========================================================= */

function getFirebaseAuth() {

    try {

        if (typeof firebase !== "undefined") {

            return firebase.auth();

        }

    } catch (error) {

        console.warn(
            "Firebase Authentication is not available.",
            error
        );

    }

    return null;
}


/* =========================================================
   AUTH STATE LISTENER
   ========================================================= */

function initAuth() {

    const auth = getFirebaseAuth();

    if (!auth) {

        console.warn(
            "Inspect Caller is running in demo authentication mode."
        );

        return;

    }


    auth.onAuthStateChanged(function(user) {

        currentUser = user || null;

        if (user) {

            console.log(
                "Logged in:",
                user.email || user.displayName
            );

            updateUserInterface(user);

        } else {

            console.log(
                "No authenticated user."
            );

        }

    });

}


/* =========================================================
   EMAIL / PASSWORD REGISTER
   ========================================================= */

async function registerUser(
    name,
    email,
    password
) {

    name = name.trim();
    email = email.trim();


    if (!name) {

        showAuthMessage(
            "Please enter your full name.",
            "error"
        );

        return false;
    }


    if (!email) {

        showAuthMessage(
            "Please enter your email.",
            "error"
        );

        return false;
    }


    if (!password || password.length < 6) {

        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return false;
    }


    const auth = getFirebaseAuth();


    /* ================= DEMO MODE ================= */

    if (!auth) {

        localStorage.setItem(
            "inspectCallerDemoUser",
            JSON.stringify({
                name: name,
                email: email
            })
        );

        showAuthMessage(
            "Demo account created successfully.",
            "success"
        );

        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 900);

        return true;
    }


    /* ================= FIREBASE ================= */

    try {

        const result =
            await auth.createUserWithEmailAndPassword(
                email,
                password
            );


        const user =
            result.user;


        if (user) {

            await user.updateProfile({

                displayName: name

            });

        }


        showAuthMessage(
            "Account created successfully.",
            "success"
        );


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


        return true;

    } catch (error) {

        console.error(error);

        showAuthMessage(
            getFirebaseError(error),
            "error"
        );

        return false;
    }

}


/* =========================================================
   EMAIL / PASSWORD LOGIN
   ========================================================= */

async function loginUser(
    email,
    password
) {

    email = email.trim();


    if (!email || !password) {

        showAuthMessage(
            "Please enter your email and password.",
            "error"
        );

        return false;
    }


    const auth = getFirebaseAuth();


    /* ================= DEMO MODE ================= */

    if (!auth) {

        const demoUser =
            JSON.parse(
                localStorage.getItem(
                    "inspectCallerDemoUser"
                ) || "null"
            );


        if (
            demoUser &&
            demoUser.email.toLowerCase() ===
            email.toLowerCase()
        ) {

            currentUser = demoUser;

        } else {

            currentUser = {

                name: "Demo User",
                email: email

            };

        }


        localStorage.setItem(
            "inspectCallerLoggedIn",
            "true"
        );


        showAuthMessage(
            "Login successful.",
            "success"
        );


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


        return true;
    }


    /* ================= FIREBASE ================= */

    try {

        await auth.signInWithEmailAndPassword(
            email,
            password
        );


        showAuthMessage(
            "Login successful.",
            "success"
        );


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


        return true;

    } catch (error) {

        console.error(error);

        showAuthMessage(
            getFirebaseError(error),
            "error"
        );

        return false;
    }

}


/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

async function loginWithGoogle() {

    const auth = getFirebaseAuth();


    if (!auth) {

        demoSocialLogin(
            "Google User",
            "google-demo@inspectcaller.local"
        );

        return;

    }


    try {

        const provider =
            new firebase.auth.GoogleAuthProvider();


        provider.setCustomParameters({

            prompt: "select_account"

        });


        await auth.signInWithPopup(
            provider
        );


        showAuthMessage(
            "Google login successful.",
            "success"
        );


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


    } catch (error) {

        console.error(error);

        showAuthMessage(
            getFirebaseError(error),
            "error"
        );

    }

}


/* =========================================================
   FACEBOOK LOGIN
   ========================================================= */

async function loginWithFacebook() {

    const auth = getFirebaseAuth();


    if (!auth) {

        demoSocialLogin(
            "Facebook User",
            "facebook-demo@inspectcaller.local"
        );

        return;

    }


    try {

        const provider =
            new firebase.auth.FacebookAuthProvider();


        await auth.signInWithPopup(
            provider
        );


        showAuthMessage(
            "Facebook login successful.",
            "success"
        );


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


    } catch (error) {

        console.error(error);

        showAuthMessage(
            getFirebaseError(error),
            "error"
        );

    }

}


/* =========================================================
   DEMO SOCIAL LOGIN
   ========================================================= */

function demoSocialLogin(
    name,
    email
) {

    const demoUser = {

        name: name,
        email: email,
        provider: "demo"

    };


    currentUser =
        demoUser;


    localStorage.setItem(
        "inspectCallerDemoUser",
        JSON.stringify(demoUser)
    );


    localStorage.setItem(
        "inspectCallerLoggedIn",
        "true"
    );


    showAuthMessage(
        "Demo login successful.",
        "success"
    );


    setTimeout(function() {

        window.location.href =
            "dashboard.html";

    }, 700);

}


/* =========================================================
   PASSWORD RESET
   ========================================================= */

async function resetPassword(email) {

    email = email.trim();


    if (!email) {

        showAuthMessage(
            "Enter your email address first.",
            "error"
        );

        return false;
    }


    const auth =
        getFirebaseAuth();


    if (!auth) {

        showAuthMessage(
            "Demo mode: password reset email is not connected.",
            "info"
        );

        return false;
    }


    try {

        await auth.sendPasswordResetEmail(
            email
        );


        showAuthMessage(
            "Password reset email sent.",
            "success"
        );


        return true;

    } catch (error) {

        console.error(error);

        showAuthMessage(
            getFirebaseError(error),
            "error"
        );

        return false;
    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logoutUser() {

    const auth =
        getFirebaseAuth();


    if (auth) {

        try {

            await auth.signOut();

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    }


    currentUser = null;


    localStorage.removeItem(
        "inspectCallerLoggedIn"
    );

    localStorage.removeItem(
        "inspectCallerDemoUser"
    );


    window.location.href =
        "index.html";

}


/* =========================================================
   PROTECT PRIVATE PAGES
   ========================================================= */

function requireLogin() {

    const auth =
        getFirebaseAuth();


    /* Firebase mode */

    if (auth) {

        auth.onAuthStateChanged(function(user) {

            if (!user) {

                window.location.href =
                    "login.html";

            } else {

                currentUser =
                    user;

                updateUserInterface(
                    user
                );

            }

        });

        return;

    }


    /* Demo mode */

    const loggedIn =
        localStorage.getItem(
            "inspectCallerLoggedIn"
        );


    if (loggedIn !== "true") {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    const auth =
        getFirebaseAuth();


    if (auth && auth.currentUser) {

        return auth.currentUser;

    }


    const demoUser =
        localStorage.getItem(
            "inspectCallerDemoUser"
        );


    if (demoUser) {

        try {

            return JSON.parse(
                demoUser
            );

        } catch (error) {

            return null;

        }

    }


    return null;

}


/* =========================================================
   UPDATE USER UI
   ========================================================= */

function updateUserInterface(user) {

    if (!user) return;


    const name =
        user.displayName ||
        user.name ||
        "User";


    const email =
        user.email ||
        "";


    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(function(element) {

            element.textContent =
                name;

        });


    document
        .querySelectorAll(
            "[data-user-email]"
        )
        .forEach(function(element) {

            element.textContent =
                email;

        });


    document
        .querySelectorAll(
            "[data-user-avatar]"
        )
        .forEach(function(element) {

            const photo =
                user.photoURL;

            if (photo) {

                element.src =
                    photo;

            }

        });

}


/* =========================================================
   AUTH MESSAGE
   ========================================================= */

function showAuthMessage(
    message,
    type = "info"
) {

    let box =
        document.getElementById(
            "authMessage"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "authMessage";


        box.style.position =
            "fixed";

        box.style.top =
            "25px";

        box.style.left =
            "50%";

        box.style.transform =
            "translateX(-50%)";

        box.style.zIndex =
            "99999";

        box.style.maxWidth =
            "90%";

        box.style.padding =
            "13px 20px";

        box.style.borderRadius =
            "14px";

        box.style.fontSize =
            "13px";

        box.style.fontWeight =
            "700";

        box.style.backdropFilter =
            "blur(15px)";


        document.body.appendChild(
            box
        );

    }


    box.textContent =
        message;


    if (type === "success") {

        box.style.background =
            "rgba(20,130,90,.92)";

        box.style.border =
            "1px solid #2de49a";

        box.style.color =
            "#ffffff";

    } else if (type === "error") {

        box.style.background =
            "rgba(130,25,45,.95)";

        box.style.border =
            "1px solid #ff7185";

        box.style.color =
            "#ffffff";

    } else {

        box.style.background =
            "rgba(8,40,65,.96)";

        box.style.border =
            "1px solid #23adff";

        box.style.color =
            "#ffffff";

    }


    clearTimeout(
        window.authMessageTimer
    );


    window.authMessageTimer =
        setTimeout(function() {

            box.remove();

        }, 3500);

}


/* =========================================================
   FIREBASE ERROR TRANSLATOR
   ========================================================= */

function getFirebaseError(error) {

    if (!error) {

        return "Something went wrong.";

    }


    const code =
        error.code || "";


    const errors = {

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/user-disabled":
            "This account has been disabled.",

        "auth/user-not-found":
            "No account was found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/invalid-credential":
            "Incorrect email or password.",

        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/weak-password":
            "Password is too weak.",

        "auth/popup-closed-by-user":
            "Login window was closed.",

        "auth/popup-blocked":
            "Your browser blocked the login popup.",

        "auth/account-exists-with-different-credential":
            "An account already exists with a different login method.",

        "auth/network-request-failed":
            "Network error. Please try again.",

        "auth/too-many-requests":
            "Too many attempts. Please try again later."

    };


    return (
        errors[code] ||
        error.message ||
        "Authentication failed."
    );

}


/* =========================================================
   AUTO INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initAuth();

    }
);
