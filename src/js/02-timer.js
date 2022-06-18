import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputTime = document.querySelector("#datetime-picker")
const startButton = document.querySelector("[data-start]")
const dataDays = document.querySelector("[data-days]")
const dataHours = document.querySelector("[data-hours]")
const dataMinutes = document.querySelector("[data-minutes]")
const dataSeconds = document.querySelector("[data-seconds]")

startButton.setAttribute("disabled", true)
let interval;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    value = "0" + value
  }
  return value;
}

flatpickr(inputTime, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose (selectedDates) {
        console.log(selectedDates[0])
        let currentDate = new Date();
      if (currentDate > selectedDates[0]) {
        startButton.setAttribute("disabled", true)
        return Notiflix.Notify.failure("Please choose a date in the future")
      }
      startButton.removeAttribute("disabled")
      startButton.addEventListener("click", () =>  interval = setInterval(() => { {
        let currentDate = new Date();
        let diffUnixTime = selectedDates[0].getTime() - currentDate.getTime();
        let convertedTime = convertMs(diffUnixTime)
          dataDays.textContent = addLeadingZero(convertedTime.days);
          dataHours.textContent = addLeadingZero(convertedTime.hours);
          dataMinutes.textContent = addLeadingZero(convertedTime.minutes);
          dataSeconds.textContent = addLeadingZero(convertedTime.seconds);
}}, 1000));

    },
}
);

