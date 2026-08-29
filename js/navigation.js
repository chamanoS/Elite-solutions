/* =========================================================
   CES NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.querySelector(".main-nav");

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("mobile-open");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu when a link is clicked */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove(
                "mobile-open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});