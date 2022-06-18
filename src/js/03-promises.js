import Notiflix from 'notiflix';

const form = document.querySelector(".form")
// let delays = [];
const { delay, step, amount } = form.elements
let timer;


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise(function(resolve, reject) {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay })
        } else {
          reject({ position, delay })
        }
      }, delay)
    })
  return promise
}
  
function submit(event) {
  event.preventDefault();
  timer = setTimeout(() => {
    for (let position = 0; position < amount.value; position += 1) {
      let totalDelay = Number(delay.value) + Number(step.value) * position
      createPromise(position, totalDelay)
        .then(({ position, delay }) =>
        Notiflix.Notify.success(`✅ Fulfilled promise ${position +=1} in ${delay}ms`))
        .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position +=1} in ${delay}ms`))
    }
  }, delay.value)
}

form.addEventListener('submit', submit);

