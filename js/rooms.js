const slider = document.querySelectorAll(".room__img-container");

slider.forEach((slider) => {
  let slides = slider.querySelectorAll(".room-img");
  let arrows = slider.querySelector(".arrows");
  let arrowRight = arrows.querySelector(".room-arrow-right");
  let arrowLeft = arrows.querySelector(".room-arrow-left");
  let dotContainer = slider.querySelector(".dot-container");

  let curSlide = 0;
  let maxSlide = slides.length;

  slider.addEventListener("mouseover", () => {
    arrows.classList.add("active");
  });

  slider.addEventListener("mouseleave", () => {
    arrows.classList.remove("active");
  });

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="dot" data-slide="${i}"></div>`
      );
    });
  };

  createDots();

  const activateDot = function (slide) {
    dotContainer.querySelectorAll(".dot").forEach((dot) => {
      dot.classList.remove("active");
    });
    dotContainer
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  };

  activateDot(curSlide);

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  goToSlide(curSlide);

  arrowRight.addEventListener("click", function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    activateDot(curSlide);
    goToSlide(curSlide);
  });
  arrowLeft.addEventListener("click", function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    activateDot(curSlide);
    goToSlide(curSlide);
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const { slide } = e.target.dataset;
      activateDot(slide);
      goToSlide(slide);
    }
  });
});
