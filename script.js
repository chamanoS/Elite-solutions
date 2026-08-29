document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu after clicking a link */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    /*
     * Because CES is now a multi-page website,
     * we don't need IntersectionObserver for navigation.
     *
     * The active class is placed directly on the
     * current page's navigation link.
     *
     * This code simply detects the current page
     * and highlights the correct link.
     */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const navLinks =
        document.querySelectorAll(".main-nav a");


    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });



    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    /*
     * Only run this code if the contact form
     * actually exists on the current page.
     */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();


                if (!name || !email || !message) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please complete the required fields.";

                    }

                    return;

                }


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you. Your enquiry has been received.";

                }


                contactForm.reset();

            }
        );

    }



    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".project-card, " +
            ".process-item, " +
            ".journey div, " +
            ".offering-card, " +
            ".practical-card, " +
            ".service-project-card"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }



    /* =========================================================
       LIVE SYSTEM TIME
    ========================================================= */

    const systemTime =
        document.getElementById("systemTime");


    function updateSystemTime() {

        if (!systemTime) return;


        const now =
            new Date();


        const hours =
            String(
                now.getHours()
            ).padStart(2, "0");


        const minutes =
            String(
                now.getMinutes()
            ).padStart(2, "0");


        const seconds =
            String(
                now.getSeconds()
            ).padStart(2, "0");


        systemTime.textContent =
            `${hours}:${minutes}:${seconds}`;

    }


    updateSystemTime();


    setInterval(
        updateSystemTime,
        1000
    );



    /* =========================================================
       DYNAMIC YEAR
    ========================================================= */

    const footerYear =
        document.querySelector(
            ".footer-bottom span"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Chamano Elite Solutions`;

    }



    /* =========================================================
       CV BUTTON
    ========================================================= */

    const downloadCv =
        document.getElementById("downloadCv");


    if (downloadCv) {

        downloadCv.addEventListener(
            "click",
            event => {

                event.preventDefault();


                alert(
                    "CV coming soon. This will be connected to the downloadable CV."
                );

            }
        );

    }



    /* =========================================================
       SERVICE OFFERING INTERACTION
    ========================================================= */

    const offeringCards =
        document.querySelectorAll(
            ".offering-card"
        );


    offeringCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "is-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "is-active"
                );

            }
        );

    });



    /* =========================================================
       CES PRACTICALS — BOOKING MODAL
    ========================================================= */

    const practicalButtons =
        document.querySelectorAll(
            ".practical-btn"
        );


    const practicalModal =
        document.getElementById(
            "practicalModal"
        );


    const closePracticalModal =
        document.getElementById(
            "closePracticalModal"
        );


    const modalProductName =
        document.getElementById(
            "modalProductName"
        );


    const modalProductPrice =
        document.getElementById(
            "modalProductPrice"
        );


    const modalContactBtn =
        document.getElementById(
            "modalContactBtn"
        );


    /*
     * Only initialise the modal if it
     * actually exists on this page.
     */

    if (practicalModal) {


        /* =====================================================
           OPEN MODAL
        ====================================================== */

        function openPracticalModal(
            productName,
            productPrice
        ) {


            if (modalProductName) {

                modalProductName.textContent =
                    productName;

            }


            if (modalProductPrice) {

                modalProductPrice.textContent =
                    productPrice;

            }


            /*
             * Pass selected product to contact page.
             */

            if (modalContactBtn) {

                const encodedProduct =
                    encodeURIComponent(
                        productName
                    );


                modalContactBtn.href =
                    `contact.html?service=${encodedProduct}`;

            }


            practicalModal.classList.add(
                "open"
            );


            practicalModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }



        /* =====================================================
           CLOSE MODAL
        ====================================================== */

        function closePracticalBooking() {

            practicalModal.classList.remove(
                "open"
            );


            practicalModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }



        /* =====================================================
           BOOK SESSION BUTTONS
        ====================================================== */

        practicalButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productName =
                        button.dataset.productName ||
                        "CES Practical Session";


                    const productPrice =
                        button.dataset.productPrice ||
                        "Price on request";


                    openPracticalModal(
                        productName,
                        productPrice
                    );

                }
            );

        });



        /* =====================================================
           CLOSE BUTTON
        ====================================================== */

        if (closePracticalModal) {

            closePracticalModal.addEventListener(
                "click",
                closePracticalBooking
            );

        }



        /* =====================================================
           OVERLAY
        ====================================================== */

        const modalOverlay =
            practicalModal.querySelector(
                ".practical-modal-overlay"
            );


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                closePracticalBooking
            );

        }



        /* =====================================================
           ESCAPE KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    practicalModal.classList.contains(
                        "open"
                    )
                ) {

                    closePracticalBooking();

                }

            }
        );

    }



    /* =========================================================
       PRESELECT SERVICE FROM URL
    ========================================================= */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedService =
        urlParams.get("service");


    const serviceSelect =
        document.getElementById(
            "serviceSelect"
        );


    if (
        selectedService &&
        serviceSelect
    ) {

        const matchingOption =
            Array.from(
                serviceSelect.options
            ).find(
                option =>
                    option.value ===
                        selectedService ||
                    option.textContent.trim() ===
                        selectedService
            );


        if (matchingOption) {

            serviceSelect.value =
                matchingOption.value;

        }

    }

});