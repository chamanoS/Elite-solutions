document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


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
                String(isOpen)
            );

        });


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =========================================================
       ACTIVE PAGE NAVIGATION
    ========================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const pageNavLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    pageNavLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href === currentPage ||
            (
                currentPage === "" &&
                href === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });



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
       SERVICE OFFERING HOVER
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


    if (practicalModal) {

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


            if (modalContactBtn) {

                const encodedProduct =
                    encodeURIComponent(
                        productName
                    );


                modalContactBtn.href =
                    `contact.html?service=CES%20Practical&product=${encodedProduct}`;

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


        if (closePracticalModal) {

            closePracticalModal.addEventListener(
                "click",
                closePracticalBooking
            );

        }


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
       CONTACT PAGE — SERVICE SELECTION
    ========================================================= */

    const serviceChoices =
        document.querySelectorAll(
            ".service-choice"
        );


    const selectedService =
        document.getElementById(
            "selectedService"
        );


    const dynamicFormSection =
        document.getElementById(
            "dynamicFormSection"
        );


    const selectedProductDisplay =
        document.getElementById(
            "selectedProductDisplay"
        );


    const dynamicFields = {

        "Development":
            document.getElementById(
                "developmentFields"
            ),

        "IT & Data":
            document.getElementById(
                "dataFields"
            ),

        "CES Practical":
            document.getElementById(
                "practicalFields"
            ),

        "Academy":
            document.getElementById(
                "academyFields"
            ),

        "Consulting":
            document.getElementById(
                "consultingFields"
            ),

        "Collaboration":
            document.getElementById(
                "collaborationFields"
            )

    };


    function selectService(
        serviceName
    ) {

        if (!selectedService) return;


        selectedService.value =
            serviceName;


        serviceChoices.forEach(choice => {

            choice.classList.toggle(
                "selected",
                choice.dataset.service ===
                    serviceName
            );

        });


        if (dynamicFormSection) {

            dynamicFormSection.classList.add(
                "visible"
            );

        }


        Object.values(
            dynamicFields
        ).forEach(field => {

            if (field) {

                field.classList.remove(
                    "active"
                );

            }

        });


        const selectedFields =
            dynamicFields[serviceName];


        if (selectedFields) {

            selectedFields.classList.add(
                "active"
            );

        }

    }


    serviceChoices.forEach(choice => {

        choice.addEventListener(
            "click",
            () => {

                selectService(
                    choice.dataset.service
                );

            }
        );

    });



    /* =========================================================
       CONTACT PAGE — URL PARAMETERS
    ========================================================= */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const urlService =
        urlParams.get("service");

    const urlProduct =
        urlParams.get("product");

    const urlSubject =
        urlParams.get("subject");

    const urlPackage =
        urlParams.get("package");
        


    if (urlService) {

        selectService(
            urlService
        );

    }


    if (
        urlProduct &&
        selectedProductDisplay
    ) {

        selectedProductDisplay.textContent =
            urlProduct;

    }

    /* =========================================================
   ACADEMY URL PARAMETERS
========================================================= */

const academySubject =
    document.querySelector(
        '[name="academySubject"]'
    );


if (
    urlSubject &&
    academySubject
) {

    const matchingSubject =
        Array.from(
            academySubject.options
        ).find(
            option =>
                option.textContent.trim() ===
                urlSubject
        );


    if (matchingSubject) {

        academySubject.value =
            matchingSubject.value;

    }

}


const academyPackage =
    document.querySelector(
        '[name="academyPackage"]'
    );


if (
    urlPackage &&
    academyPackage
) {

    academyPackage.value =
        urlPackage;

}



    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    const contactSuccess =
        document.getElementById(
            "contactSuccess"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* ---------------------------------------------
                   Basic validation
                --------------------------------------------- */

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


                const service =
                    selectedService?.value;


                if (!service) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please select what CES can help you with.";

                    }

                    document
                        .getElementById(
                            "serviceChoices"
                        )
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    return;

                }


                if (!name) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please enter your name.";

                    }

                    return;

                }


                if (!email) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please enter your email address.";

                    }

                    return;

                }


                if (!message) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please tell us a little about your enquiry.";

                    }

                    return;

                }


                /* ---------------------------------------------
                   SUCCESS
                --------------------------------------------- */

                if (formMessage) {

                    formMessage.textContent =
                        "";

                }


                contactForm.style.display =
                    "none";


                if (contactSuccess) {

                    contactSuccess.classList.add(
                        "visible"
                    );


                    contactSuccess.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    contactSuccess.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }


                /*
                 * IMPORTANT:
                 *
                 * This currently only provides a
                 * frontend success state.
                 *
                 * Later this submit action will send
                 * the enquiry to our CES backend/API.
                 */

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

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        });

    }

});