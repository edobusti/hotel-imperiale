window.onload = function () {
  window.scrollTo(0, 0);
};

const headerScroll = document.querySelector(".header__scroll");
const heroSection = document.querySelector(".hero__section");

const observeHero = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        headerScroll.classList.remove("hide");
      } else if (entry.isIntersecting) {
        headerScroll.classList.add("hide");
      }

      observeHero.observe(heroSection);
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observeHero.observe(heroSection);
