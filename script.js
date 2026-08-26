/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuButton.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* Close menu after clicking */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement = document.getElementById("typing");

const words = [
    "web experiences.",
    "full-stack apps.",
    "AI experiments.",
    "digital products."
];

let wordIndex = 0;
let characterIndex = 0;

let isDeleting = false;

function typingEffect() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typingEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    const speed = isDeleting ? 45 : 85;

    setTimeout(typingEffect, speed);
}

typingEffect();


/* =========================================================
   HEADER ON SCROLL
========================================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MOUSE FOLLOW GLOW
========================================================= */

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (event) => {

    if (!mouseGlow) return;

    mouseGlow.style.left = `${event.clientX}px`;
    mouseGlow.style.top = `${event.clientY}px`;

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".glass-card, .section-heading, .skill, .timeline-item"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ANIMATED STATS
========================================================= */

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target = Number(
            counter.getAttribute("data-count")
        );

        let current = 0;

        const increment = Math.max(
            1,
            Math.ceil(target / 40)
        );

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

    });

}


const statsSection = document.querySelector(".stats");

if (statsSection) {

    const statsObserver = new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        },
        {
            threshold: 0.5
        }
    );

    statsObserver.observe(statsSection);

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;

        }


        formMessage.textContent =
            `Thanks ${name}! Your message is ready to send.`;


        contactForm.reset();

    });

}


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   PROJECT CARD TILT EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(event) {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.width = "10px";
        ripple.style.height = "10px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,0.35)";
        ripple.style.transform = "scale(0)";
        ripple.style.pointerEvents = "none";

        const rect =
            button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.appendChild(ripple);


        ripple.animate(
            [
                {
                    transform: "scale(0)",
                    opacity: 1
                },
                {
                    transform: "scale(25)",
                    opacity: 0
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        );


        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%c👋 Hey! Welcome to Harihara Prasad's portfolio.",
    "color:#00e5ff;font-size:16px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "color:#9b5cff;font-size:12px;"
);