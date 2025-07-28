/* SEARCH BOX PLACEHOLDER */

const searchInput = document.querySelector('.search-box-input');
const shots = document.getElementById('shots');
const designers = document.getElementById('designers');
const services = document.getElementById('services');

function changePlaceholder() {
  if (shots.checked) {
    searchInput.placeholder = 'What type of design are you interested in?';
  } else if (designers.checked) {
    searchInput.placeholder = 'What type of designer do you need?';
  } else if (services.checked) {
    searchInput.placeholder = 'What do you need designed?';
  }
};

shots.addEventListener('change', changePlaceholder);
designers.addEventListener('change', changePlaceholder);
services.addEventListener('change', changePlaceholder);


