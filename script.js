/* =========================================================
   INSPECT CALLER
   script.js
   Global Frontend Controller
   ========================================================= */


/* =========================================================
   APP CONFIG
   ========================================================= */

const INSPECT_CALLER = {

    name: "Inspect Caller",

    version: "1.0.0",

    mode: "prototype",

    storageKey: "inspectCallerData",

    scanHistoryKey: "inspectCallerScanHistory",

    reportHistoryKey: "inspectCallerReports"

};



/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initNavigation();

        initMobileMenu();

        initPasswordToggles();

        initGlobalForms();

        initCounters();

        initScrollAnimations();

        loadUserData();

        updateYear();

    }
);



/* =========================================================
   NAVIGATION
   ========================================================= */

function initNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            link => {

                const href =
                    link
                        .getAttribute("href")
                        ?.split("/")
                        .pop()
                        .toLowerCase();


                if (
                    href &&
                    href === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

}



/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-btn"
        );


    const nav =
        document.querySelector(
            ".nav-links"
        );


    if (
        !menuButton ||
        !nav
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "mobile-open"
            );

            menuButton.classList.toggle(
                "open"
            );

        }
    );


    nav
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );

                    }
                );

            }
        );

}



/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function initPasswordToggles() {

    document
        .querySelectorAll(
            "[data-password-toggle]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetId =
                            button.getAttribute(
                                "data-password-toggle"
                            );


                        const input =
                            document.getElementById(
                                targetId
                            );


                        if (!input) {

                            return;

                        }


                        const isPassword =
                            input.type ===
                            "password";


                        input.type =
                            isPassword
                                ? "text"
                                : "password";


                        button.textContent =
                            isPassword
                                ? "🙈"
                                : "👁️";

                    }
                );

            }
        );

}



/* =========================================================
   GLOBAL FORM HANDLER
   ========================================================= */

function initGlobalForms() {

    document
        .querySelectorAll(
            "form[data-demo-form]"
        )
        .forEach(
            form => {

                form.addEventListener(
                    "submit",
                    event => {

                        event.preventDefault();

                        showToast(
                            "Demo submission received.",
                            "success"
                        );

                    }
                );

            }
        );

}



/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function showToast(
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "inspectToastContainer"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "inspectToastContainer";


        container.style.position =
            "fixed";

        container.style.right =
            "20px";

        container.style.bottom =
            "20px";

        container.style.zIndex =
            "99999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "10px";


        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.textContent =
        message;


    toast.style.padding =
        "12px 16px";

    toast.style.borderRadius =
        "12px";

    toast.style.border =
        "1px solid #285873";

    toast.style.background =
        "#071b2b";

    toast.style.color =
        "#d7edf5";

    toast.style.fontSize =
        "10px";

    toast.style.fontWeight =
        "800";

    toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.35)";


    if (
        type === "success"
    ) {

        toast.style.borderColor =
            "#287a61";

    }


    if (
        type === "danger"
    ) {

        toast.style.borderColor =
            "#874252";

    }


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(10px)";

            toast.style.transition =
                ".25s";


            setTimeout(
                () => {

                    toast.remove();

                },
                250
            );

        },
        2800
    );

}



/* =========================================================
   LOCAL USER DATA
   ========================================================= */

function getLocalData() {

    try {

        return JSON.parse(
            localStorage.getItem(
                INSPECT_CALLER.storageKey
            )
        ) || {};

    } catch {

        return {};

    }

}


function saveLocalData(
    data
) {

    localStorage.setItem(
        INSPECT_CALLER.storageKey,
        JSON.stringify(data)
    );

}



/* =========================================================
   USER DATA
   ========================================================= */

function loadUserData() {

    const data =
        getLocalData();


    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                data.name ||
                "Inspect Caller User";

        }
    );


    const emailElements =
        document.querySelectorAll(
            "[data-user-email]"
        );


    emailElements.forEach(
        element => {

            element.textContent =
                data.email ||
                "user@example.com";

        }
    );

}



/* =========================================================
   SAVE DEMO USER
   ========================================================= */

function saveDemoUser(
    name,
    email
) {

    const data = {

        ...getLocalData(),

        name,

        email,

        loggedIn: true,

        updatedAt:
            new Date().toISOString()

    };


    saveLocalData(
        data
    );

}



/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    const data =
        getLocalData();


    saveLocalData({

        ...data,

        loggedIn: false

    });


    showToast(
        "Logged out successfully.",
        "success"
    );


    setTimeout(
        () => {

            window.location.href =
                "login.html";

        },
        600
    );

}



/* =========================================================
   SCAN HISTORY
   ========================================================= */

function getScanHistory() {

    try {

        return JSON.parse(
            localStorage.getItem(
                INSPECT_CALLER.scanHistoryKey
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveScanResult(
    result
) {

    const history =
        getScanHistory();


    history.unshift({

        ...result,

        timestamp:
            new Date().toISOString()

    });


    /*
       Keep latest 50 scans
    */

    const limited =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        INSPECT_CALLER.scanHistoryKey,
        JSON.stringify(
            limited
        )
    );

}



/* =========================================================
   CLEAR SCAN HISTORY
   ========================================================= */

function clearScanHistory() {

    localStorage.removeItem(
        INSPECT_CALLER.scanHistoryKey
    );


    showToast(
        "Scan history cleared.",
        "success"
    );


    setTimeout(
        () => {

            location.reload();

        },
        500
    );

}



/* =========================================================
   REPORT HISTORY
   ========================================================= */

function saveReport(
    report
) {

    let reports = [];


    try {

        reports =
            JSON.parse(
                localStorage.getItem(
                    INSPECT_CALLER.reportHistoryKey
                )
            ) || [];

    } catch {

        reports = [];

    }


    reports.unshift({

        ...report,

        reportId:
            generateReportId(),

        timestamp:
            new Date().toISOString(),

        status:
            "submitted"

    });


    localStorage.setItem(
        INSPECT_CALLER.reportHistoryKey,
        JSON.stringify(
            reports.slice(
                0,
                100
            )
        )
    );

}



/* =========================================================
   REPORT ID
   ========================================================= */

function generateReportId() {

    const random =
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    return (
        "IC-" +
        random
    );

}



/* =========================================================
   COPY TEXT
   ========================================================= */

async function copyText(
    text
) {

    try {

        await navigator.clipboard
            .writeText(
                text
            );


        showToast(
            "Copied to clipboard.",
            "success"
        );


        return true;

    } catch {

        showToast(
            "Unable to copy.",
            "danger"
        );


        return false;

    }

}



/* =========================================================
   COPY ELEMENT
   ========================================================= */

function copyElementText(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    copyText(
        element.textContent.trim()
    );

}



/* =========================================================
   SHARE RESULT
   ========================================================= */

async function shareResult(
    title,
    text
) {

    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title,

                text,

                url:
                    window.location.href

            });

        } catch {

            /* User cancelled */

        }

        return;

    }


    copyText(
        text
    );

}



/* =========================================================
   COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    counters.forEach(
        counter => {

            const target =
                Number(
                    counter.dataset.counter
                );


            if (
                Number.isNaN(target)
            ) {

                return;

            }


            animateCounter(
                counter,
                target
            );

        }
    );

}


function animateCounter(
    element,
    target
) {

    let current = 0;


    const duration =
        1200;


    const start =
        performance.now();


    function update(
        now
    ) {

        const progress =
            Math.min(
                (now - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                target * eased
            );


        element.textContent =
            current.toLocaleString();


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}



/* =========================================================
   SCROLL ANIMATION
   ========================================================= */

function initScrollAnimations() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        !elements.length
    ) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}



/* =========================================================
   YEAR
   ========================================================= */

function updateYear() {

    const year =
        new Date()
            .getFullYear();


    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(
            element => {

                element.textContent =
                    year;

            }
        );

}



/* =========================================================
   ACTIVE LINK
   ========================================================= */

function setActiveLink(
    selector
) {

    document
        .querySelectorAll(
            selector
        )
        .forEach(
            link => {

                link.classList.remove(
                    "active"
                );

            }
        );


    const element =
        document.querySelector(
            selector
        );


    if (element) {

        element.classList.add(
            "active"
        );

    }

}



/* =========================================================
   SAFE TEXT ESCAPE
   ========================================================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(text);


    return div.innerHTML;

}



/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(
    date
) {

    const value =
        new Date(date);


    if (
        Number.isNaN(
            value.getTime()
        )
    ) {

        return "Unknown";

    }


    return value.toLocaleString(
        undefined,
        {

            year: "numeric",

            month: "short",

            day: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        }
    );

}



/* =========================================================
   RISK LEVEL
   ========================================================= */

function getRiskLevel(
    score
) {

    const value =
        Number(score);


    if (
        value >= 70
    ) {

        return "high";

    }


    if (
        value >= 40
    ) {

        return "medium";

    }


    return "low";

}



/* =========================================================
   RISK LABEL
   ========================================================= */

function getRiskLabel(
    score
) {

    const level =
        getRiskLevel(
            score
        );


    switch(level) {

        case "high":

            return "High Risk";


        case "medium":

            return "Medium Risk";


        default:

            return "Low Risk";

    }

}



/* =========================================================
   GLOBAL ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(
                    ".mobile-open"
                )
                .forEach(
                    element => {

                        element.classList.remove(
                            "mobile-open"
                        );

                    }
                );

        }

    }
);



/* =========================================================
   GLOBAL EXPORTS
   ========================================================= */

window.InspectCaller = {

    showToast,

    getLocalData,

    saveLocalData,

    saveDemoUser,

    logoutUser,

    getScanHistory,

    saveScanResult,

    clearScanHistory,

    saveReport,

    generateReportId,

    copyText,

    copyElementText,

    shareResult,

    escapeHTML,

    formatDate,

    getRiskLevel,

    getRiskLabel

};
