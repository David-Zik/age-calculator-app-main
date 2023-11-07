"use strict";

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const btnSendImage = document.querySelector(".send-img");
const outputDay = document.querySelector(".days");
const outputMonth = document.querySelector(".months");
const outputYear = document.querySelector(".years");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const parentElement = document.querySelectorAll(".required");

const yearParentEle = document.querySelector(".year");
const yearLabel = yearParentEle.querySelector("label");
const yearErrorMessage = yearParentEle.querySelector(".error-message");

const monthParentEle = document.querySelector(".month");
const monthLabel = monthParentEle.querySelector("label");
const monthErrorMessage = monthParentEle.querySelector(".error-message");

const dayParentEle = document.querySelector(".day");
const dayLabel = dayParentEle.querySelector("label");
const dayErrorMessage = dayParentEle.querySelector(".error-message");

// Function that holds the initial state of the output
const resetToDefaultState = function () {
  outputYear.textContent = "- -";
  outputMonth.textContent = "- -";
  outputDay.textContent = "- -";
};

window.addEventListener("DOMContentLoaded", function () {
  btnSendImage.addEventListener("click", function (event) {
    // Prevent default behavior of button
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        inputs[i].style.borderColor = "hsl(0, 100%, 67%)";
        resetToDefaultState();
      } else {
        inputs[i].style.borderColor = ""; /* reset the borderColor */
      }
    }

    for (let i = 0; i < labels.length; i++) {
      if (inputs[i].value.trim() === "") {
        labels[i].style.color = "hsl(0, 100%, 67%)";
      } else {
        labels[i].style.color = ""; /* reset the label style */
      }
    }

    for (let i = 0; i < parentElement.length; i++) {
      const parentEle = parentElement[i];

      // Only get the input element inside the current parentEle
      const input = parentEle.querySelector("input");

      // Only get the error message element inside the current parentEle
      const errorMessage = parentEle.querySelector(".error-message");

      if (window.innerWidth >= 768 && input.value.trim() === "") {
        errorMessage.style.display = "block";
        errorMessage.style.color = "hsl(0, 100%, 67%)";
        errorMessage.style.fontSize = "0.8rem";
        errorMessage.style.marginTop = "5px";
      } else {
        errorMessage.style.display = "";
      }
    }

    // Calculate the year(s)
    // - Get the current year with moment
    const currentYear = moment().format("YYYY");
    // - Get the user birth year from the input
    const birthYear = inputYear.value;

    if (inputYear.value !== "") {
      // - Calculate the age
      const age = currentYear - birthYear;
      // - Output the age
      outputYear.textContent = age;
    }

    // Calculate the month(s)
    // - Get the current month
    const currentMonth = moment().format("MM");
    // - Get the user birth month from the input
    const birthMonth = inputMonth.value;
    const validateBirthMonth = moment(birthMonth, "MM");

    // Validate if birth month is valid
    if (validateBirthMonth.isValid() && inputMonth.value !== "") {
      // Calculate the month of age
      const month = currentMonth - birthMonth;
      // Output the months of age
      outputMonth.textContent = month;
    } else if (inputMonth.value.trim() === "") {
      monthErrorMessage.textContent = "This field is required";
    } else {
      monthErrorMessage.style.display = "block";
      monthErrorMessage.textContent = "Must be a valid month";
      inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
      monthErrorMessage.style.color = "hsl(0, 100%, 67%)";
      monthErrorMessage.style.fontSize = "0.8rem";
      monthErrorMessage.style.marginTop = "5px";
      monthLabel.style.color = "hsl(0, 100%, 67%)";
      // Year error state for input label and border
      yearLabel.style.color = "hsl(0, 100%, 67%)";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
      // Day error state for input label and border
      dayLabel.style.color = "hsl(0, 100%, 67%)";
      inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    }

    // Calculate the day(s)
    // Get the user's birthday from input
    const birthDay = inputDay.value;
    // Get the current date
    const currentDate = moment();
    const userBirthday = moment(`${currentYear}-${birthMonth}-${birthDay}`);

    // Create a variable that calculate the diff of the userBirthday from the currentDate and return value in days
    const momentDuration = Math.floor(
      moment.duration(currentDate.diff(userBirthday)).asDays()
    );
    if (userBirthday.isValid()) {
      // Output the momentDuration result
      outputDay.textContent = momentDuration;
    }

    const firstDayOfMonth = moment([currentYear, birthMonth - 1, 1]);
    const firstDayOfNextMonth = moment([currentYear, birthMonth, 1]);
    const lastMonthOfYear = 12;
    const lastDateOfMonth = 31;
    // console.log(firstDayOfMonth);
    // console.log(firstDayOfNextMonth);
    const daysInMonth = firstDayOfNextMonth.diff(firstDayOfMonth, "days");
    // console.log(daysInMonth);
    const birthMonthInFull = validateBirthMonth.format("MMMM");

    if (inputDay.value.trim() <= daysInMonth && inputDay.value.trim() !== "") {
      // console.log(birthMonthInFull);
    } else if (inputDay.value.trim() > lastDateOfMonth) {
      dayErrorMessage.style.display = "block";
      dayErrorMessage.textContent = "Must be a valid date";
      dayErrorMessage.style.color = "hsl(0, 100%, 67%)";
      inputDay.style.borderColor = "hsl(0, 100%, 67%)";
      dayLabel.style.color = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.fontSize = "0.8rem";
      dayErrorMessage.style.marginTop = "5px";
      // Year error state for input label, input border and output
      yearLabel.style.color = "hsl(0, 100%, 67%)";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";

      // Month error state for input label, input border and output
      monthLabel.style.color = "hsl(0, 100%, 67%)";
      inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
    } else if (
      inputMonth.value.trim() === lastMonthOfYear.toString() &&
      inputDay.value.trim() > 0 &&
      inputDay.value.trim() <= lastDateOfMonth
    ) {
      dayErrorMessage.style.display = "none";
      outputDay.textContent = momentDuration;
      // console.log(`This is the last month of the year`);
    } else if (inputMonth.value.trim() > lastMonthOfYear) {
      resetToDefaultState();
    } else if (inputDay.value.trim() === "") {
      dayErrorMessage.textContent = "This field is required";
    } else {
      resetToDefaultState();
      dayErrorMessage.style.display = "block";
      dayErrorMessage.textContent = "Must be a valid date";
      inputDay.style.borderColor = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.color = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.fontSize = "0.8rem";
      dayErrorMessage.style.marginTop = "5px";
      dayLabel.style.color = "hsl(0, 100%, 67%)";
      // Year error state for input label, input border and output
      yearLabel.style.color = "hsl(0, 100%, 67%)";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
      // Month error state for input label, input border and output
      monthLabel.style.color = "hsl(0, 100%, 67%)";
      inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
    }

    // Check for future year from the user birth year input
    const isFutureYear = moment(birthYear, "YYYY");
    // Validate birth year if is future
    if (isFutureYear.isAfter(currentYear) && inputYear.value !== "") {
      // console.log(`${isFutureYear} is in the future`);
      yearErrorMessage.style.display = "block";
      yearErrorMessage.textContent = "Must be in the past";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
      yearErrorMessage.style.color = "hsl(0, 100%, 67%)";
      yearErrorMessage.style.fontSize = "0.8rem";
      yearErrorMessage.style.marginTop = "5px";
      yearLabel.style.color = "hsl(0, 100%, 67%)";
      resetToDefaultState();
      // Month error state for input label, input border and output
      monthLabel.style.color = "hsl(0, 100%, 67%)";
      inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
      // Day error state for input label, input border and output
      dayLabel.style.color = "hsl(0, 100%, 67%)";
      inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    } else if (inputYear.value.trim() === "") {
      yearErrorMessage.textContent = "This field is required";
    }

    // Validation if input value === 0
    if (inputDay.value.trim() === "0") {
      resetToDefaultState();
      // Day error state for input label and input border
      dayLabel.style.color = "hsl(0, 100%, 67%)";
      inputDay.style.borderColor = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.display = "block";
      dayErrorMessage.textContent = "Must be a valid date";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.color = "hsl(0, 100%, 67%)";
      dayErrorMessage.style.fontSize = "0.8rem";
      dayErrorMessage.style.marginTop = "5px";
      // Month error state for input label and input border
      monthLabel.style.color = "hsl(0, 100%, 67%)";
      inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
      // Year error state for input label and input border
      yearLabel.style.color = "hsl(0, 100%, 67%)";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
    } else if (inputMonth.value.trim() === "0") {
      resetToDefaultState();
      dayErrorMessage.style.display = "none";
    } else if (inputMonth.value.trim() === "" && inputDay.value.trim() !== "") {
      dayErrorMessage.style.display = "none";
    }

    // Reset output to initial state if input is empty
    for (let i = 0; i < parentElement.length; i++) {
      // Get the current parentElement in the for loop
      const parentEle = parentElement[i];

      // Get the current input in the current parentEle
      const input = parentEle.querySelector("input");
      // Check if input value at the current iteration is empty
      if (input.value.trim() === "") {
        resetToDefaultState();
      }
    }

    // Validation for invalid input
    // Get the inputDay value and convert into a number(integer)
    const convertBirthDay = parseInt(inputDay.value.trim());
    const convertBirthMonth = parseInt(inputMonth.value.trim());
    if (
      !isNaN(convertBirthDay) &&
      convertBirthDay <= lastDateOfMonth &&
      isNaN(convertBirthMonth)
    ) {
      resetToDefaultState();
      dayErrorMessage.style.display = "none";
    }

    // Create a variable with a moment object of the user birth input
    const validateUserBirthInput = moment(
      `${birthYear}-${birthMonth}-${birthDay}`
    );

    // Reset the output to the initial state if any of the user birth input in the moment object is invalid
    if (validateUserBirthInput.invalidAt() >= 0) {
      resetToDefaultState();
    }

    // Validate user birth year if is NaN
    // Get the birthYear and convert into a number(integer)
    const convertBirthYear = parseInt(birthYear);

    if (isNaN(convertBirthYear) && inputYear.value.trim() !== "") {
      resetToDefaultState();
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = "hsl(0, 100%, 67%)";
      }
      for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = "hsl(0, 100%, 67%)";
      }
      yearErrorMessage.style.display = "block";
      yearErrorMessage.textContent = "Must be a valid year";
      yearErrorMessage.style.color = "hsl(0, 100%, 67%)";
      yearErrorMessage.style.fontSize = "0.8rem";
      yearErrorMessage.style.marginTop = "5px";
    }

    // Remove error message if window inner width is < 768
    if (window.innerWidth < 768) {
      dayErrorMessage.style.display = "none";
      monthErrorMessage.style.display = "none";
      yearErrorMessage.style.display = "none";
    }

    // Style font size of error message if window inner width is >= 768 && <=1024
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      dayErrorMessage.style.fontSize = "0.7rem";
      monthErrorMessage.style.fontSize = "0.7rem";
      yearErrorMessage.style.fontSize = "0.7rem";
    }
  });
});
