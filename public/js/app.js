console.log('client side js rendered');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageTwo.textContent = ' ';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = ' ';
  messageTwo.textContent = ' ';
  const location = search.value;

  console.log(location);

  messageOne.textContent = 'Loading....';
  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          console.log(data.location, data.forecast);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
