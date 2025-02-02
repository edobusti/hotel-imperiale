const checkIn = document.querySelector(".selected-date.check-in");
const checkOut = document.querySelector(".selected-date.check-out");

const months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ONE_DAY_MILLISECONDS = 86400000;

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

checkIn.textContent = `${day}/${month}/${year}`;

let checkOutDefault = new Date(date.getTime() + ONE_DAY_MILLISECONDS);

checkOut.textContent = `${checkOutDefault.getDate()}/${
  checkOutDefault.getMonth() + 1
}/${checkOutDefault.getFullYear()}`;

let checkInOutContainers = [checkIn.parentElement, checkOut.parentElement];

checkInOutContainers.forEach((container) => {
  container.addEventListener("click", () => {
    container.contains(checkIn)
      ? populateChooseDateWindow(checkIn)
      : populateChooseDateWindow(checkOut);
  });
});

const populateChooseDateWindow = function (mainContainer) {
  let selectedDateContainer;
  let selectedDate;
  let chooseDateWindow;
  let daysWindow;
  let monthWindow;
  let prevMonthArrow;
  let nextMonthArrow;
  let oppositeContainer;
  let oppositeContainerChooseDateWindow;

  if (mainContainer.classList.contains("check-in")) {
    selectedDateContainer = document.querySelector(".arrival-date-container");
    selectedDate = checkIn;
    chooseDateWindow = document.querySelector(".choose-date-window.check-in");
    daysWindow = document.querySelector(".days-window.check-in");
    monthWindow = document.querySelector(".month-window.check-in");
    prevMonthArrow = document.querySelector(".arrow-prev.check-in");
    nextMonthArrow = document.querySelector(".arrow-next.check-in");
    oppositeContainer = checkOut;
    oppositeContainerChooseDateWindow = document.querySelector(
      ".choose-date-window.check-out"
    );
    closeDatesButton = document.querySelector(".close-dates.check-in");
  } else {
    selectedDateContainer = document.querySelector(".departure-date-container");
    selectedDate = checkOut;
    chooseDateWindow = document.querySelector(".choose-date-window.check-out");
    daysWindow = document.querySelector(".days-window.check-out");
    monthWindow = document.querySelector(".month-window.check-out");
    prevMonthArrow = document.querySelector(".arrow-prev.check-out");
    nextMonthArrow = document.querySelector(".arrow-next.check-out");
    oppositeContainer = checkIn;
    oppositeContainerChooseDateWindow = document.querySelector(
      ".choose-date-window.check-in"
    );
    closeDatesButton = document.querySelector(".close-dates.check-out");
  }

  chooseDateWindow.classList.add("active");
  selectedDateContainer.classList.add("active");

  oppositeContainer.parentElement.parentElement.classList.remove("active");
  oppositeContainerChooseDateWindow.classList.remove("active");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      chooseDateWindow.classList.remove("active");
      selectedDateContainer.classList.remove("active");
    }
  });

  closeDatesButton.addEventListener("click", () => {
    chooseDateWindow.classList.remove("active");
    selectedDateContainer.classList.remove("active");
  });

  let selectedDay = +selectedDate.textContent.split("/")[0];
  let selectedMonth = +selectedDate.textContent.split("/")[1];
  let selectedYear = +selectedDate.textContent.split("/")[2];

  const renderDays = function () {
    daysWindow.innerHTML = "";
    prevMonthArrow.style.visibility = "visible";
    monthWindow.textContent = months[selectedMonth - 1] + " " + selectedYear;

    let totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
    let firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    let firstDayOfMonthIndex = daysOfWeek.indexOf(
      firstDayOfMonth.toString().split(" ")[0]
    );

    for (let i = 0; i < daysOfWeek.length; i++) {
      if (i < firstDayOfMonthIndex) {
        let dayEl = document.createElement("div");
        dayEl.classList.add("day-item-empty");
        daysWindow.appendChild(dayEl);
      }
    }

    for (let i = 1; i <= totalDays; i++) {
      let dayEl = document.createElement("div");
      dayEl.classList.add("day-item");
      dayEl.textContent = i;

      if (
        i < day &&
        selectedMonth === month &&
        +monthWindow.textContent.split(" ")[1] === year
      ) {
        prevMonthArrow.style.visibility = "hidden";
        dayEl.classList.add("deleted");
      }

      let departureProhibitedDay = new Date(
        +checkIn.textContent.split("/")[2],
        +checkIn.textContent.split("/")[1] - 1,
        +checkIn.textContent.split("/")[0]
      );

      if (
        selectedDate === checkOut &&
        i <= departureProhibitedDay.getDate() &&
        selectedMonth === +checkIn.textContent.split("/")[1] &&
        selectedYear === +checkIn.textContent.split("/")[2]
      ) {
        prevMonthArrow.style.visibility = "hidden";
        dayEl.classList.add("deleted");
      }

      let lastDayLastMonth = new Date(selectedYear, selectedMonth - 1, 0);

      if (
        selectedDate === checkOut &&
        departureProhibitedDay.getTime() === lastDayLastMonth.getTime()
      ) {
        prevMonthArrow.style.visibility = "hidden";
      }

      if (
        +dayEl.textContent === selectedDay &&
        months.indexOf(monthWindow.textContent.split(" ")[0]) ===
          +selectedDate.textContent.split("/")[1] - 1 &&
        +monthWindow.textContent.split(" ")[1] ===
          +selectedDate.textContent.split("/")[2]
      ) {
        dayEl.classList.add("selected");
      }

      daysWindow.appendChild(dayEl);
    }
  };

  renderDays();

  const validateChoosenDate = function () {
    let choosenDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    let oppositeDate = new Date(
      oppositeContainer.textContent.split("/")[2],
      oppositeContainer.textContent.split("/")[1] - 1,
      oppositeContainer.textContent.split("/")[0]
    );

    if (choosenDate.getTime() < oppositeDate.getTime()) return;

    if (oppositeContainer === checkOut) {
      oppositeDate = new Date(choosenDate.getTime() + ONE_DAY_MILLISECONDS);
      oppositeContainer.textContent = `${oppositeDate.getDate()}/${
        oppositeDate.getMonth() + 1
      }/ ${oppositeDate.getFullYear()}`;
    }
  };

  chooseDateWindow.addEventListener("click", function (e) {
    if (e.target.classList.contains("day-item")) {
      selectedDate.textContent = `${+e.target.textContent}/${
        months.indexOf(monthWindow.textContent.split(" ")[0]) + 1
      }/${+monthWindow.textContent.split(" ")[1]}`;

      selectedDay = +selectedDate.textContent.split("/")[0];
      selectedMonth = +selectedDate.textContent.split("/")[1];
      selectedYear = +selectedDate.textContent.split("/")[2];
      validateChoosenDate();
      renderDays();
    }
  });

  const goToNextMonth = () => {
    selectedMonth++;
    if (selectedMonth > 12) {
      selectedMonth = 1;
      selectedYear++;
    }
  };

  const goToPrevMonth = () => {
    selectedMonth--;
    if (selectedMonth < 1) {
      selectedMonth = 12;
      selectedYear--;
    }
  };

  prevMonthArrow.addEventListener("click", () => {
    goToPrevMonth();
    renderDays();
  });

  nextMonthArrow.addEventListener("click", () => {
    goToNextMonth();
    renderDays();
  });
};

const guestsContainer = document.querySelector(".guests-container");
const guestsNumber = document.querySelector(".guests-number");
const prevArrowGuests = document.querySelector(".prev-arrow-guests");
const nextArrowGuests = document.querySelector(".next-arrow-guests");

guestsContainer.addEventListener("mouseover", () => {
  prevArrowGuests.classList.add("active");
  nextArrowGuests.classList.add("active");
});

guestsContainer.addEventListener("mouseleave", () => {
  prevArrowGuests.classList.remove("active");
  nextArrowGuests.classList.remove("active");
});

let number = +guestsNumber.textContent;

const checkGuestNumber = () => {
  number > 5
    ? (nextArrowGuests.style.visibility = "hidden")
    : (nextArrowGuests.style.visibility = "visible");

  number < 2
    ? (prevArrowGuests.style.visibility = "hidden")
    : (prevArrowGuests.style.visibility = "visible");
};

prevArrowGuests.addEventListener("click", function () {
  number--;
  guestsNumber.textContent = number;
  checkGuestNumber();
});

nextArrowGuests.addEventListener("click", function () {
  number++;
  guestsNumber.textContent = number;
  checkGuestNumber();
});
