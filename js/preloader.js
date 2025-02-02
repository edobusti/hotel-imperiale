const preloader = document.querySelector(".preloader");
setTimeout(() => {
  preloader.classList.add("fade-out");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 900);
}, 2500);
