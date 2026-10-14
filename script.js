/* =========================================================
   MD SIFATULLAH — PREMIUM ACADEMIC PORTFOLIO
   script.js
   ========================================================= */

"use strict";


/* =========================
   ELEMENT REFERENCES
========================= */

const body = document.body;
const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");

const preloader = document.getElementById("preloader");

const revealElements = document.querySelectorAll(".reveal");

const resultButtons = document.querySelectorAll(".result-btn");
const resultModal = document.getElementById("resultModal");
const resultModalTitle = document.getElementById("resultModalTitle");
const resultModalBody = document.getElementById("resultModalBody");
const resultModalCloseButtons = document.querySelectorAll("[data-close-modal]");

const certificateButtons = document.querySelectorAll(".certificate-view");
const galleryButtons = document.querySelectorAll(".gallery-open");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCloseButtons = document.querySelectorAll("[data-lightbox-close]");

const currentYear = document.getElementById("currentYear");


/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 450);

});


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================
   HEADER SCROLL EFFECT
========================= */

function updateHeader() {

  if (!siteHeader) return;

  if (window.scrollY > 30) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

}

updateHeader();

window.addEventListener("scroll", updateHeader);


/* =========================
   MOBILE NAVIGATION
========================= */

function openMenu() {

  if (!mainNav || !menuToggle) return;

  mainNav.classList.add("open");
  body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");

}


function closeMenu() {

  if (!mainNav || !menuToggle) return;

  mainNav.classList.remove("open");
  body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");

}


function toggleMenu() {

  if (!mainNav) return;

  if (mainNav.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }

}


if (menuToggle) {

  menuToggle.addEventListener("click", (event) => {

    event.stopPropagation();
    toggleMenu();

  });

}


navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    closeMenu();

  });

});


document.addEventListener("click", (event) => {

  if (!mainNav || !menuToggle) return;

  const clickedInsideNav = mainNav.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideNav && !clickedMenuButton) {
    closeMenu();
  }

});


window.addEventListener("resize", () => {

  if (window.innerWidth > 900) {
    closeMenu();
  }

});


/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const sections = document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

  let currentSection = "home";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

}


updateActiveNavigation();

window.addEventListener("scroll", updateActiveNavigation);


/* =========================
   SMOOTH ANCHOR SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", (event) => {

    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    const headerHeight = siteHeader
      ? siteHeader.offsetHeight
      : 0;

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});


/* =========================
   SCROLL REVEAL
========================= */

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }

  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================
   RESULT DATA
========================= */

/*
   পরে তোমার আসল result দিলে
   আমরা এখানে সেগুলো replace করব।
*/

const resultData = {

  "higher-secondary": {

    title: "Higher Secondary Result",

    html: `
      <div class="result-modal-content">

        <p>
          Your Higher Secondary / Alim result information
          will be added here.
        </p>

        <div style="
          margin-top: 20px;
          padding: 18px;
          border-radius: 14px;
          background: #f5f1e7;
        ">

          <strong style="
            display: block;
            color: #0b342b;
            margin-bottom: 6px;
          ">
            Result
          </strong>

          <span>
            GPA: 0.00
          </span>

        </div>

      </div>
    `

  },


  "secondary": {

    title: "Secondary Result",

    html: `
      <div class="result-modal-content">

        <p>
          Your Secondary / Dakhil result information
          will be added here.
        </p>

        <div style="
          margin-top: 20px;
          padding: 18px;
          border-radius: 14px;
          background: #f5f1e7;
        ">

          <strong style="
            display: block;
            color: #0b342b;
            margin-bottom: 6px;
          ">
            Result
          </strong>

          <span>
            GPA: 0.00
          </span>

        </div>

      </div>
    `

  }

};


/* =========================
   RESULT MODAL
========================= */

function openResultModal(resultKey) {

  if (!resultModal) return;

  const result = resultData[resultKey];

  if (!result) return;


  if (resultModalTitle) {
    resultModalTitle.textContent = result.title;
  }


  if (resultModalBody) {
    resultModalBody.innerHTML = result.html;
  }


  resultModal.classList.add("active");

  resultModal.setAttribute("aria-hidden", "false");

  body.style.overflow = "hidden";

}


function closeResultModal() {

  if (!resultModal) return;

  resultModal.classList.remove("active");

  resultModal.setAttribute("aria-hidden", "true");

  body.style.overflow = "";

}


resultButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const resultKey =
      button.getAttribute("data-result");

    openResultModal(resultKey);

  });

});


resultModalCloseButtons.forEach((button) => {

  button.addEventListener("click", closeResultModal);

});


/* =========================
   LIGHTBOX
========================= */

function openLightbox(imageSource) {

  if (!lightbox || !lightboxImage || !imageSource) return;

  lightboxImage.src = imageSource;

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  body.style.overflow = "hidden";

}


function closeLightbox() {

  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  body.style.overflow = "";

  setTimeout(() => {

    if (!lightbox.classList.contains("active")) {
      lightboxImage.src = "";
    }

  }, 300);

}


/* =========================
   CERTIFICATE LIGHTBOX
========================= */

certificateButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const imageSource =
      button.getAttribute("data-certificate");

    openLightbox(imageSource);

  });

});


/* =========================
   GALLERY LIGHTBOX
========================= */

galleryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const imageSource =
      button.getAttribute("data-gallery");

    openLightbox(imageSource);

  });

});


lightboxCloseButtons.forEach((button) => {

  button.addEventListener("click", closeLightbox);

});


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {

  if (event.key !== "Escape") return;


  if (
    resultModal &&
    resultModal.classList.contains("active")
  ) {

    closeResultModal();

  }


  if (
    lightbox &&
    lightbox.classList.contains("active")
  ) {

    closeLightbox();

  }


  if (
    mainNav &&
    mainNav.classList.contains("open")
  ) {

    closeMenu();

  }

});


/* =========================
   IMAGE ERROR HANDLING
========================= */

/*
   আমরা এখনো profile/gallery/certificate image upload করিনি।
   তাই image না থাকলে broken-image icon দেখানোর বদলে
   clean placeholder দেখাবে।
*/

document.querySelectorAll("img").forEach((image) => {

  image.addEventListener("error", () => {

    image.style.opacity = "0";

    const parent = image.parentElement;

    if (!parent) return;


    if (
      !parent.querySelector(".image-placeholder")
    ) {

      const placeholder =
        document.createElement("div");

      placeholder.className =
        "image-placeholder";

      placeholder.innerHTML = `
        <div style="
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          text-align: center;
          background:
            linear-gradient(
              135deg,
              #0b342b,
              #061b17
            );
          color: rgba(255,255,255,.7);
        ">

          <i
            class="bi bi-image"
            style="
              font-size: 2rem;
              color: #d8ba7b;
            "
          ></i>

          <span style="
            font-size: .75rem;
          ">
            Image will be added soon
          </span>

        </div>
      `;

      parent.style.position = "relative";

      parent.appendChild(placeholder);

    }

  });

});


/* =========================
   EXTERNAL LINK SAFETY
========================= */

document.querySelectorAll('a[target="_blank"]').forEach((link) => {

  const existingRel =
    link.getAttribute("rel") || "";

  if (!existingRel.includes("noopener")) {

    link.setAttribute(
      "rel",
      `${existingRel} noopener noreferrer`.trim()
    );

  }

});


/* =========================
   PAGE READY
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateHeader();
    updateActiveNavigation();

  }
);
