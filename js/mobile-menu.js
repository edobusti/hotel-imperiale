const mobileMenu = document.querySelector(".mobile-menu");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-burger-menu")) {
    mobileMenu.style.transform = "translateX(-100%)";
    mobileMenu.classList.add("active");
  }

  if (e.target.classList.contains("close-mobile-menu")) {
    mobileMenu.style.transform = "translateX(100%)";
    mobileMenu.classList.remove("active");
  }

  if (e.target.classList.contains("mobile-nav-item")) {
    mobileMenu.style.transform = "translateX(100%)";
    mobileMenu.classList.remove("active");
  }
});
